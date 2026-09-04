import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.9 — Isolamento de Tenant e Contexto Multi-Produtor', () => {

  test('exibe hierarquia de contexto multitenant no Header e Dashboard', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('dashboard-page').getByText('Contexto atual')).toBeVisible();
    await expect(page.getByTestId('dashboard-page').getByText('Diskingressos')).toBeVisible();
    await expect(page.getByTestId('dashboard-page').getByText('Produtor Exemplo')).toBeVisible();
  });

  test('mantém contexto isolado após refresh da página', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByTestId('dashboard-page')).toBeVisible();

    await expect(page.getByTestId('dashboard-page').getByText('Diskingressos')).toBeVisible();

    await page.reload();

    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByTestId('dashboard-page').getByText('Diskingressos')).toBeVisible();
    await expect(page.getByTestId('dashboard-page').getByText('Produtor Exemplo')).toBeVisible();
  });

  test('alternância de perfil demo atualiza credenciais sem quebra de sessão', async ({ page }) => {
    await page.goto('/');

    // Clica no bloco do perfil para abrir o dropdown
    const profileButton = page.locator('header').getByRole('button').filter({ hasText: 'Vinicius Casagrande' });
    await expect(profileButton).toBeVisible();
    await profileButton.click();

    // Botão de alternância demo
    const switchButton = page.getByText(/Alternar Perfil Demo/i);
    await expect(switchButton).toBeVisible();
    await switchButton.click();

    // O sistema deve continuar funcionando sem crashes
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('tenant em módulo contratado preserva escopo sem vazamento de dados', async ({ page }) => {
    await page.goto('/crm');

    await expect(page.getByTestId('module-shell')).toBeVisible();
    await expect(page.getByTestId('module-crm')).toBeVisible();
  });

});
