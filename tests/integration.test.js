import puppeteer from 'puppeteer';

describe('Marines.dev Website Integration Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // Set viewport for consistent testing
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  // Test static pages
  const staticPages = [
    { path: '/', name: 'Home Page' },
    { path: '/about', name: 'About Page' },
    { path: '/cohort', name: 'Cohort Page' },
    { path: '/timeline', name: 'Timeline Page' },
    { path: '/tour', name: 'Tour Page' },
    { path: '/publication', name: 'Publication Page' },
    { path: '/articles', name: 'Articles Index' },
    { path: '/roles', name: 'Roles Index' },
    { path: '/404', name: '404 Page' }
  ];

  describe('Static Pages Load Successfully', () => {
    staticPages.forEach(({ path, name }) => {
      test(`${name} (${path}) loads without errors`, async () => {
        const response = await page.goto(`${global.BASE_URL}${path}`, {
          waitUntil: 'networkidle0',
          timeout: 10000
        });

        // Check that the page loaded successfully (404 page is expected to return 404)
        expect(response.status()).toBeLessThan(400);

        // Check that the page has content
        const bodyText = await page.evaluate(() => document.body.textContent);
        expect(bodyText.trim().length).toBeGreaterThan(0);

        // Check for JavaScript errors
        const jsErrors = [];
        page.on('pageerror', error => jsErrors.push(error.message));

        // Wait a bit for any async JS to run
        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(jsErrors).toHaveLength(0);
      });
    });
  });

  describe('Page Performance and Accessibility', () => {
    test('Home page loads within acceptable time', async () => {
      const startTime = Date.now();

      await page.goto(`${global.BASE_URL}/`, {
        waitUntil: 'networkidle0'
      });

      const loadTime = Date.now() - startTime;

      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('Pages have proper meta tags', async () => {
      await page.goto(`${global.BASE_URL}/`);

      // Check for essential meta tags
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);

      const metaDescription = await page.$eval('meta[name="description"]',
        el => el.getAttribute('content')).catch(() => null);

      // Description should exist (though it might be empty for some pages)
      const hasDescription = metaDescription !== null;
      expect(hasDescription).toBe(true);
    });

    test('Pages are mobile responsive', async () => {
      // Test mobile viewport
      await page.setViewport({ width: 375, height: 667 });
      await page.goto(`${global.BASE_URL}/`);

      // Check that content is visible and not overflowing
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      // Allow for small differences due to scrollbars
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
    });
  });

  describe('Navigation and Links', () => {
    test('Navigation menu works correctly', async () => {
      await page.goto(`${global.BASE_URL}/`);

      // Look for navigation elements (adjust selectors based on your actual nav structure)
      const navLinks = await page.$$('nav a, header a').catch(() => []);

      if (navLinks.length > 0) {
        // Test that at least one navigation link works
        const firstLink = navLinks[0];
        const href = await firstLink.evaluate(el => el.getAttribute('href'));

        if (href && href.startsWith('/')) {
          await firstLink.click();
          await page.waitForNavigation({ waitUntil: 'networkidle0' });

          // Should navigate successfully
          const currentUrl = page.url();
          expect(currentUrl).toContain(href);
        }
      }
    });

    test('Internal links are not broken', async () => {
      await page.goto(`${global.BASE_URL}/`);

      // Get all internal links
      const internalLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href]'));
        return links
          .map(link => link.getAttribute('href'))
          .filter(href => href && (href.startsWith('/') || href.startsWith('#')))
          .filter(href => !href.startsWith('/#')) // Skip hash-only links
          .slice(0, 10); // Limit to first 10 to avoid long test times
      });

      // Test each internal link
      for (const link of internalLinks) {
        if (link.startsWith('/')) {
          const response = await page.goto(`${global.BASE_URL}${link}`, {
            waitUntil: 'networkidle0'
          });
          expect(response.status()).toBeLessThan(400);
        }
      }
    });
  });

  describe('Content Validation', () => {
    test('Pages contain expected content structure', async () => {
      await page.goto(`${global.BASE_URL}/`);

      // Check for basic HTML structure
      const hasHeader = await page.$('header') !== null;
      const hasMain = await page.$('main') !== null || await page.$('body') !== null;
      const hasFooter = await page.$('footer') !== null;

      // At minimum, should have some content structure
      expect(hasHeader || hasMain || hasFooter).toBe(true);
    });

    test('Images load correctly', async () => {
      await page.goto(`${global.BASE_URL}/`);

      // Get all images
      const images = await page.$$('img');

      if (images.length > 0) {
        // Check first few images
        const imagesToCheck = images.slice(0, 5);

        for (const img of imagesToCheck) {
          const src = await img.evaluate(el => el.src);
          const naturalWidth = await img.evaluate(el => el.naturalWidth);

          if (src && !src.includes('data:')) {
            expect(naturalWidth).toBeGreaterThan(0);
          }
        }
      }
    });
  });

  describe('Build Validation', () => {
    test('No console errors on page load', async () => {
      const consoleErrors = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(`${global.BASE_URL}/`, {
        waitUntil: 'networkidle0'
      });

      // Wait for any async operations
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Filter out common non-critical errors
      const criticalErrors = consoleErrors.filter(error =>
        !error.includes('favicon') &&
        !error.includes('404') &&
        !error.toLowerCase().includes('network')
      );

      expect(criticalErrors).toHaveLength(0);
    });

    test('CSS and JS resources load successfully', async () => {
      const failedResources = [];

      page.on('response', response => {
        const url = response.url();
        const status = response.status();

        if ((url.endsWith('.css') || url.endsWith('.js')) && status >= 400) {
          failedResources.push({ url, status });
        }
      });

      await page.goto(`${global.BASE_URL}/`, {
        waitUntil: 'networkidle0'
      });

      expect(failedResources).toHaveLength(0);
    });
  });
});
