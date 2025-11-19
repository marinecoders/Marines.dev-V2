import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

let previewServer = null;

// Global setup - start the preview server before all tests
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

// Global teardown - stop the preview server after all tests
afterAll(async () => {
  if (previewServer) {
    console.log('🧹 Stopping preview server...');
    previewServer.kill();
    await setTimeout(2000); // Give it time to clean up
  }
});

// Set up global test configuration
global.BASE_URL = 'http://localhost:4321';
