import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Fase 27.2.2.2 — Homologação Visual, Screenshots e Responsividade', () => {

  test.beforeAll(async () => {
    const dir = path.resolve('docs/evidencias');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  test('captura evidências visuais obrigatórias em alta fidelidade', async ({ page }) => {
    // 1. Dashboard Desktop (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByTestId('current-plan-card')).toBeVisible();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'dashboard-1440.png', fullPage: false });
    await page.screenshot({ path: 'docs/evidencias/dashboard-1440.png', fullPage: false });

    // 2. Sidebar Desktop
    const sidebar = page.locator('aside.aside-sidebar');
    await expect(sidebar).toBeVisible();
    await sidebar.screenshot({ path: 'sidebar-desktop.png' });
    await sidebar.screenshot({ path: 'docs/evidencias/sidebar-desktop.png' });

    // 3. Planos Desktop (1440x900)
    await page.goto('/planos');
    await expect(page.getByTestId('plans-page')).toBeVisible();
    await expect(page.getByTestId('plan-advanced')).toBeVisible();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'plans-1440.png', fullPage: false });
    await page.screenshot({ path: 'docs/evidencias/plans-1440.png', fullPage: false });

    // 4. Dashboard Mobile (390x844 - iPhone)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByTestId('current-plan-card')).toBeVisible();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'dashboard-390.png', fullPage: false });
    await page.screenshot({ path: 'docs/evidencias/dashboard-390.png', fullPage: false });

    // 5. Sidebar Mobile (Drawer aberto)
    await page.locator('button[title="Abrir Menu"]').click();
    await expect(sidebar).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'sidebar-mobile.png' });
    await page.screenshot({ path: 'docs/evidencias/sidebar-mobile.png' });

    // Fecha sidebar mobile
    await page.locator('aside.aside-sidebar button').first().click();

    // 6. Planos Mobile (390x844)
    await page.goto('/planos');
    await expect(page.getByTestId('plans-page')).toBeVisible();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'plans-390.png', fullPage: false });
    await page.screenshot({ path: 'docs/evidencias/plans-390.png', fullPage: false });
  });

  test('valida ausência de overflow horizontal em 8 resoluções críticas', async ({ page }) => {
    const resolutions = [
      { name: 'Mobile Mini', width: 360, height: 800 },
      { name: 'Mobile iPhone', width: 390, height: 844 },
      { name: 'Mobile Pro Max', width: 430, height: 932 },
      { name: 'Tablet Portrait', width: 768, height: 1024 },
      { name: 'Tablet Landscape', width: 1024, height: 768 },
      { name: 'Laptop Standard', width: 1366, height: 768 },
      { name: 'Desktop Full HD', width: 1440, height: 900 },
      { name: 'Ultra Wide Desktop', width: 1920, height: 1080 }
    ];

    for (const res of resolutions) {
      await page.setViewportSize({ width: res.width, height: res.height });
      
      // Testa Dashboard
      await page.goto('/');
      let scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      let clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth, `Overflow horizontal no Dashboard em ${res.name} (${res.width}px)`).toBeLessThanOrEqual(clientWidth + 2);

      // Testa Planos
      await page.goto('/planos');
      scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth, `Overflow horizontal em Planos em ${res.name} (${res.width}px)`).toBeLessThanOrEqual(clientWidth + 2);
    }
  });

  test('valida integridade visual de modais e ausência de crash no console', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('ERR_CONNECTION_REFUSED')) {
          consoleErrors.push(text);
        }
      }
    });
    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    await page.goto('/planos');

    // Abre modal de demonstração
    const demoBtn = page.getByRole('button', { name: /solicitar demonstração/i }).first();
    await demoBtn.click();
    await expect(page.getByRole('heading', { name: /solicitar demonstração comercial/i })).toBeVisible();

    // Fecha via botão cancelar
    await page.getByRole('button', { name: /cancelar/i }).click();
    await expect(page.getByRole('heading', { name: /solicitar demonstração comercial/i })).not.toBeVisible();

    // Abre modal Central de Apps pelo Header
    await page.getByTestId('app-launcher-button').click();
    await expect(page.getByTestId('app-launcher')).toBeVisible();

    // Fecha com tecla ESC
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('app-launcher')).not.toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

});
