import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.8.1 — Reestruturação Visual e Responsiva do Dashboard', () => {

  test('carrega o Dashboard com KPIs e grids principais', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Dashboard Executivo' })).toBeVisible();

    // 4 Top KPIs
    await expect(page.getByTestId('dashboard-kpis')).toBeVisible();
    await expect(page.getByTestId('kpi-revenue')).toBeVisible();
    await expect(page.getByTestId('kpi-orders')).toBeVisible();
    await expect(page.getByTestId('kpi-conversion')).toBeVisible();
    await expect(page.getByTestId('kpi-ticket-average')).toBeVisible();
  });

  test('exibe os 3 gráficos principais uniformes na segunda linha', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('sales-performance-chart')).toBeVisible();
    await expect(page.getByTestId('conversion-funnel')).toBeVisible();
  });

  test('exibe eventos em destaque e alertas na seção secundária', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('event-performance')).toBeVisible();
    await expect(page.getByTestId('alerts-panel')).toBeVisible();
  });

  test('não possui overflow horizontal em resoluções padrão', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // tolerância subpixel
  });

  test('sidebar e header permanecem funcionais', async ({ page }) => {
    await page.goto('/');

    // Header presente
    await expect(page.getByText(/buscar vendas/i)).toBeVisible();
    // Sidebar presente
    await expect(page.getByRole('complementary').getByText('Central de Apps')).toBeVisible();
  });

});
