import { test, expect } from '@playwright/test';

test.describe('Fase 28.1 — Autenticação e Guards no Frontend', () => {

  test('redireciona usuário não autenticado para /login', async ({ page }) => {
    // Clear storage to simulate unauthenticated state
    await page.goto('/app/dashboard');
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/app/dashboard');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText('Entre na sua conta')).toBeVisible();
  });

  test('executa login com credenciais e redireciona para /app/dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.fill('#email', 'vinicius@diskhub.com.br');
    await page.fill('#password', 'admin');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/app\/dashboard/);
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

});
