/**
 * metricsService.js
 * Single Source of Metric Truth para cálculos de KPIs e formatação consistente.
 */

export const metricsService = {
  /**
   * Calcula a receita bruta a partir das transações/pedidos confirmados.
   */
  calculateRevenue(transactions = []) {
    if (!Array.isArray(transactions) || transactions.length === 0) return 0;
    return transactions.reduce((acc, t) => {
      const isPaid = t.status === 'paid' || t.status === 'confirmed' || t.status === 'settled';
      const amount = typeof t.amount === 'number' ? t.amount : (parseFloat(t.amount) || 0);
      return isPaid ? acc + amount : acc;
    }, 0);
  },

  /**
   * Calcula a receita líquida deduzindo taxas e estornos.
   */
  calculateNetRevenue(grossRevenue = 0, fees = 0, refunds = 0) {
    const gross = typeof grossRevenue === 'number' ? grossRevenue : 0;
    const f = typeof fees === 'number' ? fees : 0;
    const r = typeof refunds === 'number' ? refunds : 0;
    return Math.max(0, gross - f - r);
  },

  /**
   * Conta a quantidade de pedidos válidos pagos.
   */
  calculateOrders(orders = []) {
    if (!Array.isArray(orders)) return 0;
    return orders.filter(o => o.status === 'paid' || o.status === 'confirmed').length;
  },

  /**
   * Soma ingressos emitidos válidos.
   */
  calculateTickets(orders = []) {
    if (!Array.isArray(orders)) return 0;
    return orders.reduce((acc, o) => {
      if (o.status === 'paid' || o.status === 'confirmed') {
        const qty = typeof o.ticketsCount === 'number' ? o.ticketsCount : (parseInt(o.ticketsCount, 10) || 1);
        return acc + qty;
      }
      return acc;
    }, 0);
  },

  /**
   * Conta clientes únicos a partir dos pedidos.
   */
  calculateUniqueCustomers(orders = []) {
    if (!Array.isArray(orders)) return 0;
    const uniqueIds = new Set();
    orders.forEach(o => {
      if ((o.status === 'paid' || o.status === 'confirmed') && o.customerId) {
        uniqueIds.add(o.customerId);
      }
    });
    return uniqueIds.size;
  },

  /**
   * Calcula o ticket médio: receita / pedidos.
   * Retorna null se pedidos === 0 (evitando divisão por zero).
   */
  calculateAverageTicket(revenue = 0, ordersCount = 0) {
    if (!ordersCount || ordersCount <= 0) return null;
    const rev = typeof revenue === 'number' ? revenue : (parseFloat(revenue) || 0);
    return parseFloat((rev / ordersCount).toFixed(2));
  },

  /**
   * Calcula taxa de conversão: pedidos / visitantes * 100.
   * Retorna null se visitantes === 0 ou indisponível.
   */
  calculateConversion(ordersCount = 0, visitorsCount = 0) {
    if (!visitorsCount || visitorsCount <= 0) return null;
    const orders = typeof ordersCount === 'number' ? ordersCount : (parseFloat(ordersCount) || 0);
    return parseFloat(((orders / visitorsCount) * 100).toFixed(2));
  },

  /**
   * Calcula variação percentual entre período atual e anterior.
   * Retorna null se previous === 0 para evitar divisão por zero.
   */
  calculateVariation(current = 0, previous = 0) {
    if (typeof previous !== 'number' || previous === 0) return null;
    const curr = typeof current === 'number' ? current : 0;
    const diff = curr - previous;
    return parseFloat(((diff / previous) * 100).toFixed(1));
  },

  /**
   * Calcula taxa de ocupação: vendidos / capacidade * 100.
   * Retorna null se capacidade não estiver definida.
   */
  calculateOccupancy(sold = 0, capacity = 0) {
    if (!capacity || capacity <= 0) return null;
    const s = typeof sold === 'number' ? sold : 0;
    return Math.min(100, parseFloat(((s / capacity) * 100).toFixed(1)));
  },

  /**
   * Formata valor numérico para Moeda Brasileira (R$).
   */
  formatCurrency(value) {
    if (value === null || value === undefined || isNaN(value)) return '—';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2
    }).format(value);
  },

  /**
   * Formata percentual com símbolo.
   */
  formatPercent(value, suffix = '%') {
    if (value === null || value === undefined || isNaN(value)) return 'Indisponível';
    return `${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}${suffix}`;
  },

  /**
   * Formata número inteiro.
   */
  formatNumber(value) {
    if (value === null || value === undefined || isNaN(value)) return '—';
    return parseInt(value, 10).toLocaleString('pt-BR');
  }
};
