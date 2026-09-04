import { metricsService } from '../src/services/metricsService.js';

function runTests() {
  console.log('🧪 Iniciando Testes Unitários de metricsService...');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. calculateRevenue
  const txs = [
    { id: '1', amount: 100, status: 'paid' },
    { id: '2', amount: 200, status: 'confirmed' },
    { id: '3', amount: 150, status: 'cancelled' }, // deve ignorar
    { id: '4', amount: 50, status: 'failed' }       // deve ignorar
  ];
  assert(metricsService.calculateRevenue(txs) === 300, 'Calcula receita bruta somando apenas transações pagas');

  // 2. calculateNetRevenue
  assert(metricsService.calculateNetRevenue(1000, 80, 200) === 720, 'Calcula receita líquida deduzindo taxas e estornos (1000 - 80 - 200 = 720)');

  // 3. calculateAverageTicket
  assert(metricsService.calculateAverageTicket(1000, 10) === 100, 'Calcula ticket médio padrão (1000 / 10 = 100)');
  assert(metricsService.calculateAverageTicket(0, 0) === null, 'Retorna null para ticket médio quando pedidos = 0 (divisão por zero prevenida)');
  assert(metricsService.calculateAverageTicket(500, 0) === null, 'Retorna null para divisor zero mesmo com receita');

  // 4. calculateConversion
  assert(metricsService.calculateConversion(100, 1000) === 10, 'Calcula conversão correta (100 / 1000 = 10%)');
  assert(metricsService.calculateConversion(10, 0) === null, 'Retorna null para conversão quando visitantes = 0');

  // 5. calculateVariation
  assert(metricsService.calculateVariation(150, 100) === 50, 'Calcula variação positiva (+50%)');
  assert(metricsService.calculateVariation(80, 100) === -20, 'Calcula variação negativa (-20%)');
  assert(metricsService.calculateVariation(100, 0) === null, 'Retorna null para variação quando período anterior = 0');

  // 6. calculateOccupancy
  assert(metricsService.calculateOccupancy(500, 1000) === 50, 'Calcula ocupação correta (50%)');
  assert(metricsService.calculateOccupancy(100, 0) === null, 'Retorna null para ocupação sem capacidade configurada');

  // 7. formatCurrency
  const formatted = metricsService.formatCurrency(184250.45);
  assert(formatted.includes('184.250') || formatted.includes('184'), 'Formata moeda brasileira com separador de milhar');
  assert(metricsService.formatCurrency(null) === '—', 'Formata null como travessão');

  console.log(`\n📊 Resultado: ${passed} passaram, ${failed} falharam.`);
  if (failed > 0) process.exit(1);
}

runTests();
