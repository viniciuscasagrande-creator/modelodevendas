import { AlertCircle, Clock3, Info, FileText } from 'lucide-react'
import { alerts } from '../data/demo'
const icons=[AlertCircle,Clock3,Info,FileText]
export function AlertsCard(){return <div className="card alerts-card"><div className="card-title-row"><h3>Alertas</h3><button className="link-btn">Ver todos</button></div><div className="list-stack">{alerts.map(([title,sub,tone],i)=>{const Icon=icons[i];return <div className="list-item" key={title}><span className={`alert-icon ${tone}`}><Icon size={15}/></span><div><strong>{title}</strong><span>{sub}</span></div></div>})}</div></div>}
