import { test, expect } from '@playwright/test';

test.describe('Fase 28.1 — Dashboard Executivo Oficial', () => {

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

  test('renderiza os 4 KPIs com formatação e sem valores nulos', async ({ page }) => {
    await page.goto('/app/dashboard');

    await expect(page.getByTestId('kpi-revenue')).toBeVisible();
    await expect(page.getByTestId('kpi-orders')).toBeVisible();
    await expect(page.getByTestId('kpi-conversion')).toBeVisible();
    await expect(page.getByTestId('kpi-ticket')).toBeVisible();

    const revenueText = await page.getByTestId('kpi-revenue').textContent();
    expect(revenueText).not.toContain('NaN');
    expect(revenueText).not.toContain('undefined');
  });

  test('exibe card do plano atual e banner de expansão', async ({ page }) => {
    await page.goto('/app/dashboard');

    await expect(page.getByTestId('current-plan-card')).toBeVisible();
    await expect(page.getByTestId('current-plan-card')).toContainText('DiskHub Advanced');

    await expect(page.getByTestId('growth-banner')).toBeVisible();
    await expect(page.getByTestId('growth-banner')).toContainText('Expanda sua operação');
  });

  test('permite revalidar dados com botão de atualização', async ({ page }) => {
    await page.goto('/app/dashboard');

    const refreshBtn = page.getByRole('button', { name: /Atualizar/i });
    await expect(refreshBtn).toBeVisible();
    await refreshBtn.click();

    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

});
