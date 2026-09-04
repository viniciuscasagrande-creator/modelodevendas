import { test, expect } from '@playwright/test';

test.describe('Fase 28.1 — Planos Comerciais Standard, Advanced e Expert', () => {

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

  test('exibe os três planos com seus taglines e CTAs oficiais', async ({ page }) => {
    await page.goto('/app/planos');

    // Standard
    await expect(page.getByText('Standard').first()).toBeVisible();
    await expect(page.getByText('Organize sua operação.').first()).toBeVisible();

    // Advanced
    await expect(page.getByText('Advanced').first()).toBeVisible();
    await expect(page.getByText('Venda mais e tenha mais controle.').first()).toBeVisible();
    await expect(page.getByText('MAIS RECOMENDADO').first()).toBeVisible();

    // Expert
    await expect(page.getByText('Expert').first()).toBeVisible();
    await expect(page.getByText('Automatize e escale sua operação.').first()).toBeVisible();
  });

});
