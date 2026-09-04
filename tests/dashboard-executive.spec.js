import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.8.2 — Refinamento Executivo e Operacional do Dashboard', () => {

  test('exibe KPIs principais com TrendIndicator', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByTestId('kpi-revenue')).toBeVisible();
    await expect(page.getByTestId('kpi-orders')).toBeVisible();
    await expect(page.getByTestId('kpi-conversion')).toBeVisible();
    await expect(page.getByTestId('kpi-ticket-average')).toBeVisible();

    // Valida presença de números e símbolos de tendência
    await expect(page.getByTestId('kpi-revenue')).toContainText('R$');
    await expect(page.getByTestId('kpi-revenue')).toContainText('↑');
  });

  test('altera período do dashboard pelo filtro global', async ({ page }) => {
    await page.goto('/');

    const filter = page.getByTestId('dashboard-period-filter');
    await expect(filter).toBeVisible();

    await filter.selectOption('7d');
    await expect(page.getByTestId('sales-performance-chart')).toBeVisible();
  });

  test('filtra dashboard por evento específico', async ({ page }) => {
    await page.goto('/');

    const eventFilter = page.getByTestId('dashboard-event-filter');
    await expect(eventFilter).toBeVisible();

    await eventFilter.selectOption('ev-1');
    await expect(page.getByTestId('event-performance')).toBeVisible();
  });

  test('exibe gráfico de performance e funil de conversão', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('sales-performance-chart')).toBeVisible();
    await expect(page.getByTestId('conversion-funnel')).toBeVisible();
    await expect(page.getByText('Checkout Iniciado')).toBeVisible();
    await expect(page.getByText('Pagamentos Confirmados')).toBeVisible();
  });

  test('exibe financeiro resumido com métricas e link', async ({ page }) => {
    await page.goto('/');

    const fin = page.getByTestId('finance-summary');
    await expect(fin).toBeVisible();
    await expect(fin).toContainText('Receita Bruta');
    await expect(fin).toContainText('Saldo Disponível');
    await expect(fin.getByRole('button', { name: /ver financeiro/i })).toBeVisible();
  });

  test('exibe eventos monitorados e alertas acionáveis', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('event-performance')).toBeVisible();
    await expect(page.getByTestId('alerts-panel')).toBeVisible();
    await expect(page.getByText('PDV 03 físico desconectado')).toBeVisible();
  });

  test('exibe atividade recente e painel de insights', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('recent-activity')).toBeVisible();
    await expect(page.getByTestId('insights-panel')).toBeVisible();
    await expect(page.getByText(/insights & oportunidades/i)).toBeVisible();
  });

  test('garante ausência de overflow horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

});
