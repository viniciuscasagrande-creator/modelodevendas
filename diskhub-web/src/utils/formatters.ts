export function formatCurrency(value: number): string {
  if (isNaN(value) || !isFinite(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatNumber(value: number): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatPercent(value: number): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}
