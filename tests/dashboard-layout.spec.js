import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.8.1 — Reestruturação Visual e Responsiva do Dashboard', () => {

  test('carrega o Dashboard com KPIs e grids principais', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText(/período:/i)).toBeVisible();

    // 4 Top KPIs
    await expect(page.getByTestId('dashboard-kpis')).toBeVisible();
    await expect(page.getByText('Faturamento Hoje')).toBeVisible();
    await expect(page.getByText('Saldo em Caixa')).toBeVisible();
    await expect(page.getByText('Lucro Líquido')).toBeVisible();
    await expect(page.getByText('Ingressos Vendidos')).toBeVisible();
  });

  test('exibe os 3 gráficos principais uniformes na segunda linha', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('dashboard-primary-grid')).toBeVisible();
    await expect(page.getByText('Conversão & Receita x Meta')).toBeVisible();
    await expect(page.getByText('Desempenho por Setor & Canal')).toBeVisible();
    await expect(page.getByText('Funil de Vendas')).toBeVisible();
  });

  test('exibe eventos em destaque e alertas na seção secundária', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('dashboard-secondary-grid')).toBeVisible();
    await expect(page.getByText('Metal Fest Curitiba 2026')).toBeVisible();
    await expect(page.getByText('Festival de Inverno 2026')).toBeVisible();
    await expect(page.getByText('Alertas / Insights')).toBeVisible();
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
    await expect(page.getByText('Buscar cliente')).toBeVisible();
    // Sidebar presente
    await expect(page.getByText('Central de Apps')).toBeVisible();
  });

});
