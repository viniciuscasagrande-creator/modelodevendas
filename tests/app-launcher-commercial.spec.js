import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.1 — Central de Apps Comercial', () => {

  test('abre Central de Apps', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();

    await expect(page.getByTestId('app-launcher')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DiskHub Business Cloud' })).toBeVisible();
  });

  test('abre CRM contratado (Ativo)', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();

    await page.getByTestId('app-crm').click();
    await expect(page).toHaveURL(/crm/);
  });

  test('leva produto disponível ou upgrade para página comercial ou planos', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();

    await page.getByTestId('app-marketing').click();
    await expect(page).toHaveURL(/planos.*marketing|produtos\/marketing/);
  });

  test('busca aplicativo em tempo real por nome', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();

    await page.getByTestId('app-search').fill('CRM');
    await expect(page.getByTestId('app-crm')).toBeVisible();
    await expect(page.getByTestId('app-accounting')).not.toBeVisible();
  });

  test('filtra por Meus Apps e Upgrade', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();

    await page.getByTestId('app-filter-upgrade').click();
    await expect(page.getByTestId('app-accounting')).toBeVisible();
    await expect(page.getByTestId('app-crm')).not.toBeVisible();

    await page.getByTestId('app-filter-active').click();
    await expect(page.getByTestId('app-crm')).toBeVisible();
  });

  test('fecha launcher com ESC', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('app-launcher-button').click();
    await expect(page.getByTestId('app-launcher')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('app-launcher')).not.toBeVisible();
  });

});
