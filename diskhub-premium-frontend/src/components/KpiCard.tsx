import { BarChart3, ShoppingCart, UsersRound, Coins } from 'lucide-react'
const icons = [BarChart3, ShoppingCart, UsersRound, Coins]
export function KpiCard({ index, label, value, change, tone }: { index:number; label:string; value:string; change:string; tone:string }) {
  const Icon = icons[index] ?? BarChart3
  return <div className="kpi card">
    <div className={`kpi-icon ${tone}`}><Icon size={24}/></div>
    <div className="kpi-copy"><strong>{value}</strong><span>{label}</span><small>↑ {change.replace('+','')}</small></div>
    <svg className={`spark ${tone}`} viewBox="0 0 84 38" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="1,35 10,28 18,31 28,21 38,25 47,16 57,20 67,11 75,13 83,4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  </div>
}
