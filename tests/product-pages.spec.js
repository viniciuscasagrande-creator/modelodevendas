import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.2 — Páginas Comerciais dos Módulos', () => {

  test('abre página comercial do CRM', async ({ page }) => {
    await page.goto('/produtos/crm');

    await expect(page.getByTestId('product-page')).toBeVisible();
    await expect(page.getByTestId('product-name')).toContainText('CRM');
    await expect(page.getByTestId('product-benefits')).toBeVisible();
    await expect(page.getByTestId('product-features')).toBeVisible();
  });

  test('abre produto Marketing com plano Advanced', async ({ page }) => {
    await page.goto('/produtos/marketing');

    await expect(page.getByTestId('product-page')).toBeVisible();
    await expect(page.getByTestId('product-name')).toContainText('Marketing');
    await expect(page.getByTestId('product-plan')).toContainText(/ADVANCED/i);
  });

  test('CTA de contratação abre planos', async ({ page }) => {
    await page.goto('/produtos/marketing');

    await page.getByTestId('product-primary-cta').click();
    await expect(page).toHaveURL(/planos/);
  });

  test('abre formulário de demonstração', async ({ page }) => {
    await page.goto('/produtos/crm');

    await page.getByTestId('product-demo-cta').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByText(/solicitar demonstração/i)).toBeVisible();
  });

  test('produto inexistente possui fallback seguro', async ({ page }) => {
    await page.goto('/produtos/inexistente');

    await expect(page.getByText(/produto não encontrado/i)).toBeVisible();
    await expect(page.getByText(/voltar para central de apps/i)).toBeVisible();
  });

});
