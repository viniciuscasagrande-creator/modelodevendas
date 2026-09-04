import {
  BadgeDollarSign, BarChart3, Bot, Boxes, BrainCircuit, CircleHelp, CreditCard,
  Headphones, Home, Megaphone, PanelsTopLeft, Settings, SlidersHorizontal,
  UsersRound, WalletCards, Workflow
} from 'lucide-react'
import { Logo } from './Logo'

const main = [
  [Home, 'Dashboard', true],
  [PanelsTopLeft, 'Central de Apps'],
  [CreditCard, 'Planos'],
]
const modules = [
  [UsersRound, 'CRM'], [Boxes, 'ERP'], [WalletCards, 'Financeiro'], [Megaphone, 'Marketing'],
  [Headphones, 'SAC'], [BarChart3, 'BI & Analytics'], [BadgeDollarSign, 'Contabilidade'],
  [Workflow, 'Automação'], [BrainCircuit, 'Inteligência Artificial'], [SlidersHorizontal, 'Integrações'],
]
const bottom = [[CreditCard,'Minha Assinatura'], [Settings,'Configurações'], [CircleHelp,'Ajuda']]

function NavRow({ item }: { item: any[] }) {
  const [Icon, label, active] = item
  return <button className={`nav-row ${active ? 'active' : ''}`}><Icon size={17}/><span>{label}</span></button>
}

export function Sidebar() {
  return <aside className="sidebar">
    <Logo />
    <nav>
      <div className="nav-group">{main.map((i,idx)=><NavRow key={idx} item={i}/>)}</div>
      <div className="divider" />
      <div className="nav-group">{modules.map((i,idx)=><NavRow key={idx} item={i}/>)}</div>
      <div className="divider" />
      <div className="nav-group">{bottom.map((i,idx)=><NavRow key={idx} item={i}/>)}</div>
    </nav>
    <div className="upgrade-mini">
      <div className="upgrade-mini__icon">♛</div>
      <div className="upgrade-mini__text">Evolua sua operação<br/>com o DiskHub.</div>
      <button>Ver planos <span>→</span></button>
    </div>
  </aside>
}
