'use client'
import SessionGate from '@/components/SessionGate'

export default function Votacoes() {
  return (
    <SessionGate>
      <h1 className="text-2xl font-semibold mb-4">Votações</h1>
      <p className="text-sm text-gray-600">MVP: em breve criar/abrir votações e ver progresso.</p>
    </SessionGate>
  )
}
