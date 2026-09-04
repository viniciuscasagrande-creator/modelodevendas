import { test, expect } from '@playwright/test';

test.describe('Fase 28.1 — Navegação, Módulos e Anti-Tela-Branca', () => {

  test.beforeEach(async ({ page }) => {
    // Authenticate user via localStorage
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

  test('navega por todos os módulos do menu sem tela branca', async ({ page }) => {
    test.setTimeout(60000);
    const routes = [
      { path: '/app/dashboard', testId: 'dashboard-page' },
      { path: '/app/apps', text: 'Central de Apps' },
      { path: '/app/planos', text: 'Planos projetados' },
      { path: '/app/assinatura', text: 'Minha Assinatura' },
      { path: '/app/configuracoes', text: 'Configurações do Sistema' },
      { path: '/app/crm', text: 'CRM Comercial' },
      { path: '/app/erp', text: 'ERP Operacional' },
      { path: '/app/financeiro', text: 'Financeiro & Conciliação' },
      { path: '/app/marketing', text: 'Marketing & Audiência' },
      { path: '/app/sac', text: 'SAC & Atendimento' },
      { path: '/app/bi', text: 'BI & Analytics' },
      { path: '/app/contabilidade', text: 'Contabilidade & DRE' },
      { path: '/app/automacao', text: 'Automações Avançadas' },
      { path: '/app/ia', text: 'Inteligência Artificial' },
      { path: '/app/integracoes', text: 'Webhooks & Integrações' },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      if (route.testId) {
        await expect(page.getByTestId(route.testId)).toBeVisible();
      } else if (route.text) {
        await expect(page.getByText(route.text).first()).toBeVisible();
      }
      const bodyText = await page.textContent('body');
      expect(bodyText?.length).toBeGreaterThan(50);
    }
  });

  test('abre modal de busca global com atalho ou botão', async ({ page }) => {
    await page.goto('/app/dashboard');
    await page.getByTestId('global-search-button').click();
    await expect(page.getByPlaceholder(/Buscar páginas, módulos, planos.../i)).toBeVisible();

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(page.getByPlaceholder(/Buscar páginas, módulos, planos.../i)).not.toBeVisible();
  });

});
