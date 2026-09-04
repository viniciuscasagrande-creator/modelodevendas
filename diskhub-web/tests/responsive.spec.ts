import { test, expect } from '@playwright/test';

test.describe('Fase 28.1 — Responsividade e Ausência de Overflow Horizontal', () => {

  const viewports = [
    { width: 1920, height: 1080, name: 'Desktop 1080p' },
    { width: 1440, height: 900, name: 'MacBook Pro 1440' },
    { width: 1366, height: 768, name: 'Laptop 1366' },
    { width: 1024, height: 768, name: 'iPad Pro / Tablet' },
    { width: 768, height: 1024, name: 'iPad Mini / Tablet portrait' },
    { width: 430, height: 932, name: 'iPhone 14 Pro Max' },
    { width: 390, height: 844, name: 'iPhone 13/14/15' },
    { width: 360, height: 800, name: 'Android Standard' },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.setItem('diskhub_token', 'token-test-28-1');
      localStorage.setItem(
        'diskhub_user',
        JSON.stringify({
          id: 'usr-1',
          name: 'Vinicius Casagrande',
          email: 'vinicius@diskhub.com.br',
          role: 'CEO & Fundador',
        })
      );
    });
  });

  for (const vp of viewports) {
    test(`não possui overflow horizontal em ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/app/dashboard');

      await expect(page.getByTestId('dashboard-page')).toBeVisible();

      // Check for horizontal scroll on root document
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll).toBeFalsy();
    });
  }

  test('não gera erros críticos de JavaScript ou ChunkLoadError no console', async ({ page }) => {
    const criticalErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore expected network errors when local server is offline
        if (!text.includes('Failed to load resource') && !text.includes('net::ERR_CONNECTION_REFUSED')) {
          criticalErrors.push(text);
        }
      }
    });

    page.on('pageerror', (err) => {
      criticalErrors.push(err.message);
    });

    await page.goto('/app/dashboard');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();

    expect(criticalErrors.filter((e) => e.includes('ChunkLoadError'))).toHaveLength(0);
    expect(criticalErrors.filter((e) => e.includes('Uncaught SyntaxError'))).toHaveLength(0);
  });

});
