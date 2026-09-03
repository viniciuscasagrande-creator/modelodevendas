import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.6 — Minha Assinatura e Gestão do Contrato', () => {

  test('mostra plano atual', async ({ page }) => {
    await page.goto('/assinatura');

    await expect(page.getByTestId('subscription-page')).toBeVisible();
    await expect(page.getByTestId('subscription-plan')).toBeVisible();
  });

  test('mostra assinatura ativa', async ({ page }) => {
    await page.goto('/assinatura');

    await expect(page.getByTestId('subscription-status')).toContainText(/ativa/i);
  });

  test('lista aplicativos contratados', async ({ page }) => {
    await page.goto('/assinatura/apps');

    await expect(page.getByTestId('subscription-apps')).toBeVisible();
    await expect(page.getByTestId('subscription-apps')).toContainText('CRM');
    await expect(page.getByTestId('subscription-apps')).toContainText('ERP');
  });

  test('inicia fluxo de upgrade pelo botão', async ({ page }) => {
    await page.goto('/assinatura');

    await page.getByTestId('upgrade-button').first().click();
    await expect(page).toHaveURL(/planos.*upgrade/);
  });

  test('lista faturas com histórico', async ({ page }) => {
    await page.goto('/assinatura/cobranca');

    await expect(page.getByTestId('subscription-invoices')).toBeVisible();
    await expect(page.getByTestId('subscription-billing')).toBeVisible();
    await expect(page.getByText('Mastercard •••• 4582')).toBeVisible();
  });

  test('exibe trilha de auditoria e eventos', async ({ page }) => {
    await page.goto('/assinatura/historico');

    await expect(page.getByTestId('subscription-history')).toBeVisible();
    await expect(page.getByText(/pagamento de fatura confirmado/i)).toBeVisible();
  });

  test('navega para gestão de usuários da equipe', async ({ page }) => {
    await page.goto('/assinatura/usuarios');

    await expect(page.getByTestId('users-page')).toBeVisible();
    await expect(page.getByTestId('invite-user-button')).toBeVisible();
  });

});
