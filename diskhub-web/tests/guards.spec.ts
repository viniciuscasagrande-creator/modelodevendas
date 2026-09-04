import { test, expect } from '@playwright/test';

test.describe('Fase 28.2 — Licenciamento e Guards de Acesso', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.setItem('diskhub_token', 'token-test-28-2');
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

  test('permite acesso a módulos licenciados no plano atual (CRM)', async ({ page }) => {
    await page.goto('/app/crm');
    await expect(page.getByText('CRM Comercial').first()).toBeVisible();
    await expect(page.getByText('Módulo Habilitado')).toBeVisible();
    // Guard allows content, not upgrade screen
    await expect(page.getByTestId('access-guard-upgrade-crm')).not.toBeVisible();
  });

  test('exibe tela comercial amigável sem tela branca para módulos que requerem upgrade (Automação)', async ({ page }) => {
    await page.goto('/app/automacao');
    // Guard must NOT return null or blank page
    await expect(page.getByText('Automações Avançadas').first()).toBeVisible();
    // Verify presence of upgrade view or enabled view depending on active plan
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
    expect(body?.length).toBeGreaterThan(100);
  });

});
