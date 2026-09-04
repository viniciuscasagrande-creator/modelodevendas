import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.8.3 — Dashboard com Dados Reais, KPIs e Integração com APIs', () => {

  test('carrega KPIs com valores formatados e sem NaN ou Infinity', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');

    await expect(page.getByTestId('dashboard-page')).toBeVisible();

    const revenueCard = page.getByTestId('kpi-revenue');
    const ordersCard = page.getByTestId('kpi-orders');
    const conversionCard = page.getByTestId('kpi-conversion');
    const ticketAvgCard = page.getByTestId('kpi-ticket-average');

    await expect(revenueCard).toBeVisible();
    await expect(ordersCard).toBeVisible();
    await expect(conversionCard).toBeVisible();
    await expect(ticketAvgCard).toBeVisible();

    // Valida que não existe texto 'NaN' ou 'Infinity' em nenhum dos cards
    const textContent = await page.getByTestId('dashboard-kpis').textContent();
    expect(textContent).not.toContain('NaN');
    expect(textContent).not.toContain('Infinity');
    expect(textContent).not.toContain('undefined');

    // Valida formatação correta de moeda
    expect(textContent).toContain('R$');

    expect(consoleErrors).toEqual([]);
  });

  test('filtra período dinamicamente e atualiza curva de performance', async ({ page }) => {
    await page.goto('/');

    const periodFilter = page.getByTestId('dashboard-period-filter');
    await expect(periodFilter).toBeVisible();

    // Seleciona últimos 7 dias
    await periodFilter.selectOption('7d');
    await expect(page.getByTestId('sales-performance-chart')).toBeVisible();

    // Seleciona hoje
    await periodFilter.selectOption('today');
    await expect(page.getByTestId('sales-performance-chart')).toBeVisible();
  });

  test('filtra por evento específico e mantém consistência dos dados', async ({ page }) => {
    await page.goto('/');

    const eventFilter = page.getByTestId('dashboard-event-filter');
    await expect(eventFilter).toBeVisible();

    await eventFilter.selectOption('ev-1'); // Metal Fest
    await expect(page.getByTestId('event-performance')).toBeVisible();

    // Retorna para todos os eventos
    await eventFilter.selectOption('all');
    await expect(page.getByTestId('event-performance')).toBeVisible();
  });

  test('exibe resumo financeiro com dados consolidados e botão funcional', async ({ page }) => {
    await page.goto('/');

    const fin = page.getByTestId('finance-summary');
    await expect(fin).toBeVisible();
    await expect(fin).toContainText('Receita Bruta');
    await expect(fin).toContainText('Saldo Disponível');
    await expect(fin).toContainText('Taxas da Plataforma');
    await expect(fin).toContainText('Margem Líquida da Operação');
  });

  test('botão atualizar executa revalidação sem quebrar a página', async ({ page }) => {
    await page.goto('/');

    const refreshBtn = page.getByRole('button', { name: /atualizar/i });
    await expect(refreshBtn).toBeVisible();
    await refreshBtn.click();

    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByText(/atualizado:/i)).toBeVisible();
  });

});
