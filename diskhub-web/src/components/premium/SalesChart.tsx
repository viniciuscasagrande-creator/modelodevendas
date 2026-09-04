import { sales } from '../../data/demo'
export function SalesChart() {
  return <div className="card sales-card">
    <div className="card-title-row"><h3>Performance de vendas</h3><button className="select-btn">Receita⌄</button></div>
    <div className="chart-area">
      <div className="y-axis"><span>200K</span><span>150K</span><span>100K</span><span>50K</span><span>0</span></div>
      <div className="chart-grid">
        {[0,1,2,3,4].map(i=><i key={i}/>) }
        <div className="bars">
          {sales.map((v,i)=><b key={i} style={{height:`${Math.max(18, Math.round(v/2.1))}%`}} className={i%7===3?'purple':''}/>) }
        </div>
        <div className="x-axis"><span>1 Jan</span><span>5 Jan</span><span>10 Jan</span><span>15 Jan</span><span>20 Jan</span><span>25 Jan</span><span>30 Jan</span></div>
      </div>
    </div>
  </div>
}
