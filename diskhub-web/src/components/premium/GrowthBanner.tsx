import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'

export function GrowthBanner() {
  const navigate = useNavigate()
  return (
    <section className="growth-banner" data-testid="growth-banner">
      <div className="growth-left">
        <div className="growth-icon"><BarChart3/></div>
        <div>
          <h2>Expanda sua operação</h2>
          <p>Novas oportunidades para vender mais, automatizar processos e tomar decisões com dados.</p>
        </div>
      </div>
      <button onClick={() => navigate('/app/planos')}>
        Conhecer soluções <span>→</span>
      </button>
      <div className="growth-art"><i/><i/><i/><i/></div>
    </section>
  )
}
