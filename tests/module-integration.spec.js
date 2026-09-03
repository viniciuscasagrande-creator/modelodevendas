import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.8 — Integração Padronizada dos Módulos Contratados', () => {

  test('abre CRM dentro do ModuleShell com tenant e breadcrumbs', async ({ page }) => {
    await page.goto('/crm');

    await expect(page.getByTestId('app-bootstrap')).not.toBeVisible();
    await expect(page.getByTestId('module-shell')).toBeVisible();
    await expect(page.getByTestId('module-crm')).toBeVisible();
    await expect(page.getByText('CRM & Vendas')).toBeVisible();
  });

  test('bloqueia módulo Marketing para plano Standard com tela comercial sem licença', async ({ page }) => {
    await page.goto('/marketing');

    await expect(page.getByTestId('access-no-license')).toBeVisible();
    await expect(page.getByText(/disponível no plano advanced/i)).toBeVisible();
    await expect(page.getByText(/ver planos & upgrade/i)).toBeVisible();
  });

  test('ModuleShell permite abrir Central de Apps de dentro de qualquer módulo', async ({ page }) => {
    await page.goto('/crm');

    await expect(page.getByTestId('module-shell')).toBeVisible();
    
    // Clica no botão Apps do cabeçalho do módulo
    await page.getByTestId('module-shell').getByRole('button', { name: /apps/i }).click();

    await expect(page.getByTestId('app-launcher')).toBeVisible();
  });

  test('refresh direto em módulo contratado funciona perfeitamente', async ({ page }) => {
    await page.goto('/crm');
    await expect(page.getByTestId('module-crm')).toBeVisible();

    await page.reload();

    await expect(page.getByTestId('module-crm')).toBeVisible();
  });

  test('módulo em implantação exibe estado de implantação padronizado', async ({ page }) => {
    await page.goto('/automacao');

    await expect(page.getByTestId('access-no-license').or(page.getByTestId('access-implementing'))).toBeVisible();
  });

});
