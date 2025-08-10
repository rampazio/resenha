'use client'
import SessionGate from '@/components/SessionGate'

export default function Comidas() {
  return (
    <SessionGate>
      <h1 className="text-2xl font-semibold mb-4">Comidas</h1>
      <p className="text-sm text-gray-600">MVP: consolidar itens de comida de todas as resenhas.</p>
    </SessionGate>
  )
}
