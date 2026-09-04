import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.3 — Planos Standard, Advanced e Expert', () => {

  test('abre página de planos e exibe os três tiers', async ({ page }) => {
    await page.goto('/planos');

    await expect(page.getByTestId('plans-page')).toBeVisible();
    await expect(page.getByTestId('plan-standard')).toBeVisible();
    await expect(page.getByTestId('plan-advanced')).toBeVisible();
    await expect(page.getByTestId('plan-expert')).toBeVisible();
  });

  test('identifica plano atual', async ({ page }) => {
    await page.goto('/planos');

    await expect(page.getByTestId('plan-current-badge')).toContainText(/atual/i);
  });

  test('seleciona plano Advanced e navega para contratação', async ({ page }) => {
    await page.goto('/planos');

    await page.getByTestId('plan-advanced-cta').click();
    await expect(page).toHaveURL(/contratacao.*advanced/);
  });

  test('destaca planos contextuais para liberar Marketing', async ({ page }) => {
    await page.goto('/planos?produto=marketing');

    await expect(page.getByText(/marketing está disponível nos planos/i)).toBeVisible();
    await expect(page.getByTestId('plan-advanced')).toBeVisible();
  });

  test('mostra matriz comparativa completa', async ({ page }) => {
    await page.goto('/planos');

    await expect(page.getByTestId('plan-comparison')).toBeVisible();
    await expect(page.getByText('CRM & Vendas')).toBeVisible();
    await expect(page.getByText('Marketing Digital')).toBeVisible();
    await expect(page.getByText('Contabilidade & NF-e').first()).toBeVisible();
  });

});
