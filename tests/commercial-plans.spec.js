import { test, expect } from '@playwright/test';

test.describe('Fase 27.2.1 / 27.2.2.1 — Integração Comercial no Dashboard e Shell', () => {

  test('exibe CurrentPlanCard no Dashboard com informações de assinatura e link', async ({ page }) => {
    await page.goto('/');

    const planCard = page.getByTestId('current-plan-card');
    await expect(planCard).toBeVisible();

    await expect(planCard).toContainText(/plano/i);
    await expect(planCard).toContainText(/módulos/i);
    await expect(planCard).toContainText(/usuário/i);

    // Clica no link para Minha Assinatura
    await planCard.getByRole('button', { name: /gerenciar assinatura/i }).click();
    await expect(page).toHaveURL(/assinatura/);
  });

  test('exibe GrowthBanner com posicionamento modular e CTA para /planos', async ({ page }) => {
    await page.goto('/');

    const growthBanner = page.getByTestId('growth-banner');
    await expect(growthBanner).toBeVisible();
    await expect(growthBanner).toContainText(/expanda sua operação/i);

    // Clica no botão Conhecer Soluções
    await growthBanner.getByRole('button', { name: /conhecer soluções/i }).click();
    await expect(page).toHaveURL(/planos/);
    await expect(page.getByTestId('plans-page')).toBeVisible();
  });

  test('exibe CommercialPlansPreview com os três pacotes e navega para /planos', async ({ page }) => {
    await page.goto('/');

    const preview = page.getByTestId('commercial-plans-preview');
    await expect(preview).toBeVisible();
    await expect(preview).toContainText('Standard');
    await expect(preview).toContainText('Advanced');
    await expect(preview).toContainText('Expert');
    await expect(preview).toContainText('Mais Recomendado');

    // Clica para ver matriz comparativa
    await preview.getByRole('button', { name: /ver matriz comparativa completa/i }).click();
    await expect(page).toHaveURL(/planos/);
  });

  test('sidebar contém atalho direto para Planos & Soluções', async ({ page }) => {
    await page.goto('/');

    const sidebarItem = page.getByRole('complementary').getByRole('button', { name: /planos & soluções/i });
    await expect(sidebarItem).toBeVisible();

    await sidebarItem.click();
    await expect(page).toHaveURL(/planos/);
    await expect(page.getByTestId('plans-page')).toBeVisible();
  });

});
