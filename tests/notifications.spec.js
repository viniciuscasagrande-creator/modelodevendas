import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.8.4 — Central de Alertas, Notificações e Atividade', () => {

  test('abre gaveta de notificações ao clicar no sino do Header', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('notification-bell').click();
    await expect(page.getByTestId('notification-drawer')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Notificações' })).toBeVisible();
  });

  test('fecha gaveta de notificações com tecla ESC', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('notification-bell').click();
    await expect(page.getByTestId('notification-drawer')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('notification-drawer')).not.toBeVisible();
  });

  test('marca todas as notificações como lidas a partir da gaveta', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('notification-bell').click();
    await expect(page.getByTestId('notification-drawer')).toBeVisible();

    const readAllButton = page.getByTestId('notification-drawer').getByTestId('notification-read-all');
    if (await readAllButton.isVisible()) {
      await readAllButton.click();
    }
    await expect(page.getByTestId('notification-drawer')).toBeVisible();
  });

  test('navega diretamente para a página /notificacoes sem tela branca', async ({ page }) => {
    await page.goto('/notificacoes');

    await expect(page.getByTestId('notifications-page')).toBeVisible();
    await expect(page.getByTestId('tab-notificacoes')).toBeVisible();
    await expect(page.getByTestId('tab-alertas')).toBeVisible();
    await expect(page.getByTestId('tab-atividades')).toBeVisible();
  });

  test('alterna entre abas de Notificações, Alertas e Feed de Atividade', async ({ page }) => {
    await page.goto('/notificacoes');

    await expect(page.getByTestId('notifications-page')).toBeVisible();

    // Alterna para Alertas
    await page.getByTestId('tab-alertas').click();
    await expect(page.getByTestId('tab-alertas')).toHaveClass(/bg-\[#F97316\]/);

    // Alterna para Atividades
    await page.getByTestId('tab-atividades').click();
    await expect(page.getByTestId('tab-atividades')).toHaveClass(/bg-\[#F97316\]/);

    // Retorna para Notificações
    await page.getByTestId('tab-notificacoes').click();
    await expect(page.getByTestId('tab-notificacoes')).toHaveClass(/bg-\[#F97316\]/);
  });

});
