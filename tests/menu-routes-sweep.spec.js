import { test, expect } from '@playwright/test';

test.describe('Fase 27.1.9 — Varredura Completa de Menus, Rotas e Anti-Tela-Branca', () => {

  const criticalRoutes = [
    { path: '/', name: 'Dashboard' },
    { path: '/vendas', name: 'Vendas' },
    { path: '/eventos', name: 'Eventos' },
    { path: '/pdvs', name: 'PDVs' },
    { path: '/ingressos', name: 'Ingressos' },
    { path: '/crm', name: 'CRM' },
    { path: '/sac', name: 'SAC' },
    { path: '/financeiro', name: 'Financeiro' },
    { path: '/contabilidade', name: 'Contabilidade' },
    { path: '/estoque', name: 'Estoque' },
    { path: '/patrimonio', name: 'Patrimônio' },
    { path: '/marketing', name: 'Marketing' },
    { path: '/bi', name: 'BI & Analytics' },
    { path: '/notificacoes', name: 'Notificações' },
    { path: '/integracoes', name: 'Integrações' },
    { path: '/usuarios', name: 'Usuários' },
    { path: '/planos', name: 'Planos' },
    { path: '/assinatura', name: 'Assinatura' }
  ];

  for (const route of criticalRoutes) {
    test(`carrega a rota ${route.path} (${route.name}) sem tela branca`, async ({ page }) => {
      const consoleErrors = [];
      page.on('pageerror', (err) => consoleErrors.push(err.message));

      await page.goto(route.path);

      // Garante que o root possui conteúdo visível e layout estrutural
      await expect(page.locator('#root')).toBeVisible();
      const rootHtml = await page.locator('#root').innerHTML();
      expect(rootHtml.trim().length).toBeGreaterThan(100);

      // Garante que o Header e a Sidebar estão visíveis
      await expect(page.getByTestId('app-launcher-button')).toBeVisible();

      // Tolerância zero para crashes de JS no carregamento de rota
      expect(consoleErrors).toEqual([]);
    });
  }

  test('refresh direto (F5/reload) preserva rota sem tela branca', async ({ page }) => {
    await page.goto('/financeiro');
    await expect(page.locator('#root')).toBeVisible();

    await page.reload();

    await expect(page.locator('#root')).toBeVisible();
    await expect(page.getByTestId('app-launcher-button')).toBeVisible();
  });

  test('rota inexistente não gera tela branca e possui fallback seguro', async ({ page }) => {
    await page.goto('/rota-inexistente-12345');

    await expect(page.locator('#root')).toBeVisible();
    const rootHtml = await page.locator('#root').innerHTML();
    expect(rootHtml.trim().length).toBeGreaterThan(100);
  });

});
