export function downloadSimulatedCSV(
  filename = 'fechamento_contabil.csv', 
  headers = ['ID', 'Data', 'Tipo', 'Valor', 'Status'], 
  dataRows = []
) {
  const defaultRows = dataRows.length > 0 ? dataRows : [
    ['tr-1', '2026-07-17', 'Venda Online', '850.00', 'Pago'],
    ['tr-2', '2026-07-17', 'Fisico PDV B', '1200.00', 'Pago'],
    ['tr-3', '2026-07-16', 'Reembolso', '-150.00', 'Estornado']
  ];
  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(','), ...defaultRows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
