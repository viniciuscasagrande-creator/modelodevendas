import { recentEvents } from '../../data/demo'
export function ActivityCard() {
  return <div className="card activity-card">
    <div className="card-title-row"><h3>Eventos recentes</h3><button className="link-btn">Ver todos</button></div>
    <div className="list-stack">
      {recentEvents.map(([title,time,tone])=><div className="list-item" key={title}><span className={`dot ${tone}`}/><div><strong>{title}</strong><span>{time}</span></div></div>)}
    </div>
  </div>
}
