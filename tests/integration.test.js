import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

describe('Marines.dev Website Integration Tests', () => {
  let previewServer = null;

  beforeAll(async () => {
    console.log('🚀 Starting Astro preview server for integration tests...');

    // Build the site first
    console.log('📦 Building the site...');
    const buildProcess = spawn('npm', ['run', 'build'], {
      stdio: 'pipe',
      cwd: process.cwd()
    });

    await new Promise((resolve, reject) => {
      buildProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Build completed successfully');
          resolve();
        } else {
          reject(new Error(`Build failed with code ${code}`));
        }
      });
    });

    // Start preview server
    previewServer = spawn('npm', ['run', 'preview'], {
      stdio: 'pipe',
      cwd: process.cwd()
    });

    // Wait for server to be ready
    console.log('⏳ Waiting for preview server to be ready...');
    let serverReady = false;
    let attempts = 0;
    const maxAttempts = 30;

    while (!serverReady && attempts < maxAttempts) {
      try {
        const response = await fetch('http://localhost:4321');
        if (response.ok) {
          serverReady = true;
          console.log('✅ Preview server is ready');
        }
      } catch (error) {
        // Server not ready yet, wait and try again
        await setTimeout(1000);
        attempts++;
      }
    }

    if (!serverReady) {
      throw new Error('Preview server failed to start within timeout period');
    }
  }, 60000);

  afterAll(async () => {
    // Stop preview server
    if (previewServer) {
      console.log('🧹 Stopping preview server...');
      previewServer.kill('SIGTERM');

      // Wait for the process to exit
      await new Promise((resolve) => {
        previewServer.on('exit', () => {
          console.log('✅ Preview server stopped');
          resolve();
        });

        // Force kill after 5 seconds if it doesn't exit gracefully
        const forceKillTimeout = global.setTimeout(() => {
          if (!previewServer.killed) {
            previewServer.kill('SIGKILL');
            console.log('⚠️ Preview server force killed');
          }
          resolve();
        }, 5000);

        // Clear timeout if process exits gracefully
        previewServer.on('exit', () => {
          global.clearTimeout(forceKillTimeout);
        });
      });
    }
  });

  // Test all main pages return 200 status
  const mainPages = [
    { path: '/', name: 'Home page' },
    { path: '/about', name: 'About page' },
    { path: '/cohort', name: 'Cohort page' },
    { path: '/easter-egg', name: 'Easter egg page' },
    { path: '/publication', name: 'Publication page' },
    { path: '/timeline', name: 'Timeline page' },
    { path: '/tour', name: 'Tour page' },
    { path: '/articles', name: 'Articles index page' },
    { path: '/roles', name: 'Roles index page' }
  ];

  mainPages.forEach(({ path, name }) => {
    test(`${name} returns 200 status`, async () => {
      console.log(`🧪 Testing ${name} (${path})...`);

      const response = await fetch(`http://localhost:4321${path}`);
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('text/html');

      const html = await response.text();
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
      expect(html).toContain('<title>');

      console.log(`✅ ${name} test passed`);
    });
  });

  test('Server starts and responds to requests', async () => {
    console.log('🧪 Testing server response...');

    const response = await fetch('http://localhost:4321');
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain('<html');
    expect(html.length).toBeGreaterThan(100);

    console.log('✅ Server test passed');
  });

  test('Static assets are served correctly', async () => {
    console.log('🧪 Testing static assets...');

    // Test favicon
    const faviconResponse = await fetch('http://localhost:4321/favicon.svg');
    expect(faviconResponse.status).toBe(200);

    // Test other common assets
    const logoResponse = await fetch('http://localhost:4321/ega.svg');
    expect(logoResponse.status).toBe(200);

    console.log('✅ Static assets test passed');
  });

  test('404 page handles non-existent routes', async () => {
    console.log('🧪 Testing 404 handling...');

    const response = await fetch('http://localhost:4321/non-existent-page');
    expect(response.status).toBe(404);

    const html = await response.text();
    expect(html).toContain('<html');

    console.log('✅ 404 handling test passed');
  });
});
