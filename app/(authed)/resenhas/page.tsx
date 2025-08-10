'use client'
import SessionGate from '@/components/SessionGate'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Resenha = { id: string; title: string; status: string }

export default function ResenhasPage() {
  const [items, setItems] = useState<Resenha[]>([])

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('resenhas').select('id,title,status').order('created_at', { ascending: false })
      if (data) setItems(data as Resenha[])
    }
    load()
  }, [])

  return (
    <SessionGate>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Resenhas</h1>
        <Link href="/resenhas/new" className="px-3 py-2 rounded bg-black text-white">Criar Resenha</Link>
      </div>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.id} className="border rounded p-3 flex items-center justify-between">
            <span>{i.title}</span>
            <Link href={`/resenhas/${i.id}`} className="text-sm underline">abrir</Link>
          </li>
        ))}
        {items.length===0 && <li className="text-sm text-gray-600">Nada por aqui.</li>}
      </ul>
    </SessionGate>
  )
}
