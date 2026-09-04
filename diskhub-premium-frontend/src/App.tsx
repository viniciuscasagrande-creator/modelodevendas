import { CalendarDays } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { KpiCard } from './components/KpiCard'
import { SalesChart } from './components/SalesChart'
import { ActivityCard } from './components/ActivityCard'
import { AlertsCard } from './components/AlertsCard'
import { CurrentPlan } from './components/CurrentPlan'
import { GrowthBanner } from './components/GrowthBanner'
import { PlanCard } from './components/PlanCard'
import { kpis } from './data/demo'

export default function App(){
  return <div className="app-shell">
    <Sidebar/>
    <div className="app-main">
      <Header/>
      <main className="dashboard">
        <section className="dashboard-top">
          <div>
            <h1>Bom dia, Ana!</h1>
            <p>Sua operação está em crescimento. Veja os principais indicadores de hoje.</p>
          </div>
          <button className="period"><CalendarDays size={16}/> Últimos 30 dias <span>⌄</span></button>
        </section>
        <section className="overview-grid">
          <div className="kpi-grid">{kpis.map((k,i)=><KpiCard key={k.label} index={i} {...k}/>)}</div>
          <CurrentPlan/>
        </section>
        <section className="analytics-grid"><SalesChart/><ActivityCard/><AlertsCard/></section>
        <GrowthBanner/>
        <section className="plans-section">
          <div className="plans-copy">
            <div className="eyebrow">PLANOS DISKHUB</div>
            <div className="tiny-line"/>
            <h2>Um DiskHub<br/>para <span>cada fase</span><br/>da sua <span>operação.</span></h2>
            <p>Organize sua empresa, aumente suas vendas e evolua para uma operação integrada, automatizada e orientada por dados.</p>
            <div className="plan-copy-actions"><button className="primary-light">Conhecer os pacotes <span>→</span></button><button className="secondary-dark">Comparar planos</button></div>
            <a href="#">Descobrir meu plano <span>→</span></a>
          </div>
          <div className="plans-grid">
            <PlanCard kind="standard" title="Organize sua operação." subtitle="Para produtores que precisam centralizar clientes, gestão administrativa e financeiro." items={['CRM','ERP','Financeiro','Mais controle','Menos planilhas']}/>
            <PlanCard kind="advanced" recommended title="Venda mais e tenha mais controle." subtitle="Para produtores que querem crescer utilizando marketing, atendimento estruturado e inteligência de dados." items={['Tudo do Standard','Marketing','SAC','BI & Analytics','Mais vendas','Mais inteligência']}/>
            <PlanCard kind="expert" title="Automatize e escale sua operação." subtitle="Para operações profissionais que precisam integrar sistemas, automatizar processos e utilizar inteligência." items={['Tudo do Advanced','Contabilidade','Automação','Inteligência Artificial','Integrações','Mais escala']}/>
          </div>
        </section>
      </main>
    </div>
  </div>
}
