import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Fase 28.1 — Evidências Visuais e Screenshots do Novo Frontend', () => {

  test.beforeAll(async () => {
    const dir = path.join(process.cwd(), 'docs', 'evidencias');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  test('captura telas oficiais do diskhub-web em desktop e mobile', async ({ page }) => {
    // 1. Login Page
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/login');
    await page.screenshot({ path: 'docs/evidencias/diskhub-web-login-1440.png', fullPage: true });

    // Authenticate
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

    // 2. Dashboard 1440
    await page.goto('/app/dashboard');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'docs/evidencias/diskhub-web-dashboard-1440.png', fullPage: true });

    // 3. Dashboard Mobile 390
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/app/dashboard');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'docs/evidencias/diskhub-web-dashboard-390.png', fullPage: true });

    // 4. Central de Apps Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/app/apps');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'docs/evidencias/diskhub-web-apps-1440.png', fullPage: true });

    // 5. Planos Desktop
    await page.goto('/app/planos');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'docs/evidencias/diskhub-web-planos-1440.png', fullPage: true });

    // 6. Assinatura Desktop
    await page.goto('/app/assinatura');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'docs/evidencias/diskhub-web-assinatura-1440.png', fullPage: true });
  });

});
