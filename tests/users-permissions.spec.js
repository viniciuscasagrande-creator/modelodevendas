import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.7 — Usuários, Papéis e Permissões por Módulo', () => {

  test('abre gestão de usuários e lista membros', async ({ page }) => {
    await page.goto('/assinatura/usuarios');

    await expect(page.getByTestId('users-page')).toBeVisible();
    await expect(page.getByTestId('users-table')).toBeVisible();
    await expect(page.getByText('Vinicius Casagrande')).toBeVisible();
  });

  test('abre modal de convite de usuário', async ({ page }) => {
    await page.goto('/assinatura/usuarios');

    await page.getByTestId('invite-user-button').click();
    await expect(page.getByTestId('invite-modal')).toBeVisible();
    await expect(page.getByTestId('invite-email')).toBeVisible();
    await expect(page.getByTestId('invite-role')).toBeVisible();
  });

  test('filtra membros por status', async ({ page }) => {
    await page.goto('/assinatura/usuarios');

    await page.getByTestId('user-status-filter').getByText(/ativos/i).click();
    await expect(page.getByText('Vinicius Casagrande')).toBeVisible();
    await expect(page.getByText('Pedro Henrique Alves')).not.toBeVisible();
  });

  test('busca usuário em tempo real', async ({ page }) => {
    await page.goto('/assinatura/usuarios');

    await page.getByTestId('user-search').fill('Mariana');
    await expect(page.getByText('Mariana Souza')).toBeVisible();
    await expect(page.getByText('Vinicius Casagrande')).not.toBeVisible();
  });

  test('abre matriz de permissões do usuário', async ({ page }) => {
    await page.goto('/assinatura/usuarios');

    await page.getByText('Permissões').first().click();
    await expect(page.getByTestId('permission-matrix')).toBeVisible();
    await expect(page.getByTestId('permission-module-crm')).toBeVisible();
  });

});
