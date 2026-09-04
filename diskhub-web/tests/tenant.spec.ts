import { test, expect } from '@playwright/test';

test.describe('Fase 28.2 — Multitenant, Troca de Produtor e Isolamento', () => {

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

  test('exibe o seletor de produtor/tenant no cabeçalho com o tenant padrão', async ({ page }) => {
    await page.goto('/app/dashboard');
    await page.waitForSelector('[data-testid="tenant-switcher-trigger"]', { timeout: 10000 });

    const trigger = page.getByTestId('tenant-switcher-trigger');
    await expect(trigger).toBeVisible();

    const activeName = page.getByTestId('tenant-active-name');
    await expect(activeName).toBeVisible();
    await expect(activeName).toContainText(/Diskingressos|Arena Music/);
  });

  test('abre menu dropdown ao clicar no seletor de tenants', async ({ page }) => {
    await page.goto('/app/dashboard');
    await page.waitForSelector('[data-testid="tenant-switcher-trigger"]', { timeout: 10000 });

    await page.getByTestId('tenant-switcher-trigger').click();
    await expect(page.getByTestId('tenant-switcher-dropdown')).toBeVisible();

    // Verify presence of other tenants
    await expect(page.getByTestId('tenant-option-tenant-diskhub-01')).toBeVisible();
    await expect(page.getByTestId('tenant-option-tenant-arena-02')).toBeVisible();
    await expect(page.getByTestId('tenant-option-tenant-sunset-03')).toBeVisible();
  });

  test('alterna entre produtores e atualiza o contexto e plano', async ({ page }) => {
    await page.goto('/app/dashboard');
    await page.waitForSelector('[data-testid="tenant-switcher-trigger"]', { timeout: 10000 });

    // Open dropdown
    await page.getByTestId('tenant-switcher-trigger').click();
    await expect(page.getByTestId('tenant-switcher-dropdown')).toBeVisible();

    // Select Arena Music Curitiba (Expert plan)
    await page.getByTestId('tenant-option-tenant-arena-02').click();

    // Verify active name is updated
    await expect(page.getByTestId('tenant-active-name')).toContainText('Arena Music Curitiba');
    await expect(page.getByTestId('tenant-active-badge')).toContainText('expert');
  });

});
