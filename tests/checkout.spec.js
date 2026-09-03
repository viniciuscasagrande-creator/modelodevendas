import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.4 — Contratação e Checkout Comercial', () => {

  test('abre contratação do Advanced diretamente pela URL', async ({ page }) => {
    await page.goto('/contratacao?plan=advanced');

    await expect(page.getByTestId('checkout-page')).toBeVisible();
    await expect(page.getByTestId('selected-plan')).toContainText(/advanced/i);
    await expect(page.getByTestId('checkout-stepper')).toBeVisible();
  });

  test('avança para dados da empresa e valida preenchimento', async ({ page }) => {
    await page.goto('/contratacao?plan=advanced');

    await page.getByTestId('checkout-continue').click();

    await expect(page.getByTestId('company-legal-name')).toBeVisible();
    await page.getByTestId('company-legal-name').fill('Produtora Teste Ltda');
    await page.getByTestId('company-document').fill('12.345.678/0001-90');
    await page.getByTestId('company-email').fill('teste@produtora.com');
  });

  test('configura quantidade de usuários e add-on', async ({ page }) => {
    await page.goto('/contratacao?plan=advanced');

    // Avança para empresa
    await page.getByTestId('checkout-continue').click();
    // Avança para usuários
    await page.getByTestId('checkout-continue').click();

    await expect(page.getByTestId('users-quantity')).toBeVisible();

    // Avança para add-ons
    await page.getByTestId('checkout-continue').click();
    await expect(page.getByTestId('addon-whatsapp')).toBeVisible();
    await page.getByTestId('addon-whatsapp').click();

    await expect(page.getByTestId('checkout-summary')).toContainText(/1 selecionados/i);
  });

  test('mantém dados persistidos ao voltar etapa', async ({ page }) => {
    await page.goto('/contratacao?plan=advanced');

    // Etapa 2
    await page.getByTestId('checkout-continue').click();
    await page.getByTestId('company-legal-name').fill('Minha Produtora S/A');

    // Etapa 3
    await page.getByTestId('checkout-continue').click();

    // Voltar para Etapa 2
    await page.getByTestId('checkout-back').click();

    await expect(page.getByTestId('company-legal-name')).toHaveValue('Minha Produtora S/A');
  });

});
