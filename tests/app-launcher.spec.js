import { test, expect } from '@playwright/test';

test.describe('Fase 27.1 - Menu Central de Apps (DiskHub Launchpad)', () => {

  test('abre o menu central de apps', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();

    await expect(
      page.getByTestId('app-launcher')
    ).toBeVisible();
  });

  test('abre modulo de vendas', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();
    await page.getByTestId('app-sales').click();

    await expect(page).toHaveURL(/vendas/);
    await expect(page.getByTestId('sales-page')).toBeVisible();
  });

  test('abre modulo financeiro', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();
    await page.getByTestId('app-finance').click();

    await expect(page).toHaveURL(/financeiro/);
  });

  test('abre modulo marketing', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();
    await page.getByTestId('app-marketing').click();

    await expect(page).toHaveURL(/marketing/);
  });

  test('abre modulo sac', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();
    await page.getByTestId('app-sac').click();

    await expect(page).toHaveURL(/sac/);
  });

  test('fecha o menu central com tecla ESC', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();
    await expect(page.getByTestId('app-launcher')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('app-launcher')).not.toBeVisible();
  });

  test('filtra aplicativos na busca em tempo real', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();
    
    await page.getByPlaceholder('Buscar aplicativo...').fill('Marketing');
    await expect(page.getByTestId('app-marketing')).toBeVisible();
    await expect(page.getByTestId('app-finance')).not.toBeVisible();
  });

});
