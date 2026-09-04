import { test, expect } from '@playwright/test';

test.describe('Fase 27.2.2 — Página Premium de Planos e Soluções', () => {

  test('abre /planos e exibe os três planos comerciais com posicionamento de valor', async ({ page }) => {
    await page.goto('/planos');

    await expect(page.getByTestId('plans-page')).toBeVisible();
    await expect(page.getByTestId('plans-hero')).toBeVisible();

    // 3 Planos
    const standard = page.getByTestId('plan-standard');
    const advanced = page.getByTestId('plan-advanced');
    const expert = page.getByTestId('plan-expert');

    await expect(standard).toBeVisible();
    await expect(advanced).toBeVisible();
    await expect(expert).toBeVisible();

    // Posicionamento comercial
    await expect(standard).toContainText('Organize sua operação');
    await expect(advanced).toContainText('Venda mais e tenha mais controle');
    await expect(expert).toContainText('Automatize e escale sua operação');

    // Destaque do plano Advanced como mais recomendado
    await expect(advanced).toContainText('MAIS RECOMENDADO');
  });

  test('interage com o seletor de objetivos e destaca o plano correspondente', async ({ page }) => {
    await page.goto('/planos');

    // Clica em Organizar
    await page.getByRole('button', { name: /conhecer standard/i }).first().click();
    await expect(page.getByTestId('plan-standard')).toBeVisible();

    // Clica em Escalar
    await page.getByRole('button', { name: /conhecer expert/i }).first().click();
    await expect(page.getByTestId('plan-expert')).toBeVisible();

    // Clica em Crescer
    await page.getByRole('button', { name: /conhecer advanced/i }).first().click();
    await expect(page.getByTestId('plan-advanced')).toBeVisible();
  });

  test('exibe matriz de benefícios comerciais tangíveis', async ({ page }) => {
    await page.goto('/planos');

    await expect(page.getByRole('heading', { name: /o que muda na sua operação/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mais Produtividade' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mais Vendas' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Centralização' })).toBeVisible();
  });

  test('exibe comparativo detalhado e accordion no mobile', async ({ page }) => {
    // Desktop: tabela
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/planos');
    await expect(page.getByTestId('plan-comparison')).toBeVisible();

    // Mobile: accordion
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/planos');
    await expect(page.getByTestId('plan-comparison-mobile')).toBeVisible();
  });

  test('exibe catálogo de add-ons opcionais', async ({ page }) => {
    await page.goto('/planos');

    const addons = page.getByTestId('addons-section');
    await expect(addons).toBeVisible();
    await expect(addons).toContainText('Personalize seu DiskHub');
    await expect(addons).toContainText('Usuários Adicionais');
    await expect(addons).toContainText('WhatsApp Business API Dedicado');
    await expect(addons).toContainText('Consulte condições comerciais');
  });

  test('interage com FAQ comercial', async ({ page }) => {
    await page.goto('/planos');

    const faqQuestion = page.getByRole('button', { name: /posso mudar de plano depois/i });
    await expect(faqQuestion).toBeVisible();
    await faqQuestion.click();
    await expect(page.getByText(/upgrade é imediato/i)).toBeVisible();
  });

  test('abre modal de solicitação de demonstração e envia formulário', async ({ page }) => {
    await page.goto('/planos');

    const demoBtn = page.getByRole('button', { name: /solicitar demonstração/i }).first();
    await expect(demoBtn).toBeVisible();
    await demoBtn.click();

    // Modal visível
    await expect(page.getByRole('heading', { name: /solicitar demonstração comercial/i })).toBeVisible();

    // Preenche campos
    await page.fill('input[placeholder="Ex: João da Silva"]', 'Carlos Produtor');
    await page.fill('input[placeholder="joao@empresa.com"]', 'carlos@produtora.com');
    await page.fill('input[placeholder="(41) 99999-9999"]', '11999998888');
    await page.fill('input[placeholder="Ex: Prime Eventos Ltda"]', 'Carlos Eventos');

    // Envia formulário
    await page.getByRole('button', { name: /enviar solicitação/i }).click();

    // Confirmação via toast e fechamento de modal
    await expect(page.getByText(/solicitação enviada/i)).toBeVisible();
  });

  test('CTA de contratação navega com o parâmetro correto do plano', async ({ page }) => {
    await page.goto('/planos');

    await page.getByTestId('plan-advanced-cta').click();
    await expect(page).toHaveURL(/contratacao\?plan=advanced/);
  });

  test('suporta parâmetros contextuais de produto para recomendação', async ({ page }) => {
    await page.goto('/planos?produto=marketing');
    await expect(page.getByText(/marketing está disponível nos planos/i)).toBeVisible();

    await page.goto('/planos?produto=ia');
    await expect(page.getByText(/ia está disponível no plano expert/i)).toBeVisible();
  });

  test('não possui overflow horizontal em diferentes resoluções', async ({ page }) => {
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/planos');

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    }
  });

});
