import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown } from 'lucide-react'
import { useAppContext } from '../../hooks/useAppContext'

export function CurrentPlan() {
  const navigate = useNavigate()
  const { subscription } = useAppContext()
  const planName = subscription?.planName || 'Advanced'
  const appsCount = subscription?.activeAppsCount || 6
  const usersCount = subscription?.usersCount || 12

  return (
    <div className="card current-plan" data-testid="current-plan-card">
      <div className="current-plan__top">
        <div className="crown-box"><Crown size={30}/></div>
        <div>
          <span>Você está no plano</span>
          <strong><span className="sr-only">DiskHub </span>{planName}</strong>
          <small>{appsCount} apps ativos&nbsp;&nbsp;•&nbsp;&nbsp;{usersCount} usuários</small>
        </div>
      </div>
      <div className="progress"><i/></div>
      <div className="billing">
        <div>
          <span>Próxima cobrança</span>
          <strong>15 de jan. de 2026</strong>
        </div>
        <button onClick={() => navigate('/app/assinatura')}>
          Ver minha assinatura <b>→</b>
        </button>
      </div>
    </div>
  )
}
