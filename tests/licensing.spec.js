import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.5 — Licenciamento e AppAccessGuard', () => {

  test('Standard libera acesso ao CRM e ERP', async ({ page }) => {
    await page.goto('/crm');

    await expect(page.getByTestId('access-blocked')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: /crm/i })).toBeVisible();
  });

  test('Plano Standard bloqueia Marketing com tela de upgrade e sem tela branca', async ({ page }) => {
    await page.goto('/marketing');

    await expect(page.getByTestId('access-blocked')).toBeVisible();
    await expect(page.getByText(/disponível no plano advanced/i)).toBeVisible();
    await expect(page.getByText(/ver planos & upgrade/i)).toBeVisible();
  });

  test('Plano Standard bloqueia Contabilidade com tela de upgrade para Expert', async ({ page }) => {
    await page.goto('/contabilidade');

    await expect(page.getByTestId('access-blocked')).toBeVisible();
    await expect(page.getByText(/disponível no plano expert/i)).toBeVisible();
  });

  test('botão de upgrade na tela de bloqueio direciona para planos com contexto', async ({ page }) => {
    await page.goto('/marketing');

    await page.getByText(/ver planos & upgrade/i).click();
    await expect(page).toHaveURL(/planos.*marketing/);
  });

});
