'use client'
import SessionGate from '@/components/SessionGate'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Resenha = {
  id: string;
  title: string;
  location: string | null;
  starts_at: string | null;
  ends_at: string | null;
  status: 'aberta'|'parcial'|'paga'|'arquivada';
}

export default function Dashboard() {
  const [items, setItems] = useState<Resenha[]>([])

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('resenhas')
        .select('id,title,location,starts_at,ends_at,status')
        .order('starts_at', { ascending: true })
        .limit(20)
      if (!error && data) setItems(data as Resenha[])
    }
    load()
  }, [])

  return (
    <SessionGate>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Status Geral</h1>
        <Link href="/resenhas/new" className="px-3 py-2 rounded bg-black text-white">Criar Resenha</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((r) => (
          <Link key={r.id} href={`/resenhas/${r.id}`} className="border rounded-lg p-4 hover:shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium">{r.title}</h2>
              <span className={`text-xs px-2 py-1 rounded ${r.status==='paga'?'bg-green-100 text-green-700': r.status==='parcial'?'bg-yellow-100 text-yellow-700': r.status==='aberta'?'bg-gray-100 text-gray-700':'bg-slate-100 text-slate-700'}`}>{r.status}</span>
            </div>
            <p className="text-sm text-gray-600">{r.location ?? 'Local a definir'}</p>
            <p className="text-xs text-gray-500 mt-1">
              {r.starts_at ? new Date(r.starts_at).toLocaleString() : '—'} {r.ends_at ? ' → ' + new Date(r.ends_at).toLocaleString() : ''}
            </p>
          </Link>
        ))}
        {items.length===0 && (
          <div className="text-sm text-gray-600">Sem resenhas ainda. Clique em “Criar Resenha”.</div>
        )}
      </div>
    </SessionGate>
  )
}
