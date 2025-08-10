'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import SessionGate from '@/components/SessionGate'

type Resenha = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string | null;
  ends_at: string | null;
  status: 'aberta'|'parcial'|'paga'|'arquivada';
}

export default function ResenhaDetail() {
  const params = useParams()
  const id = params?.id as string
  const [r, setR] = useState<Resenha | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('resenhas').select('*').eq('id', id).single()
      setR(data as Resenha)
    }
    if (id) load()
  }, [id])

  if (!id) return null

  return (
    <SessionGate>
      {!r ? <div>Carregando...</div> : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{r.title}</h1>
            <span className={`text-xs px-2 py-1 rounded ${r.status==='paga'?'bg-green-100 text-green-700': r.status==='parcial'?'bg-yellow-100 text-yellow-700': r.status==='aberta'?'bg-gray-100 text-gray-700':'bg-slate-100 text-slate-700'}`}>{r.status}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h2 className="font-medium mb-2">Resumo</h2>
              <p className="text-sm text-gray-700"><b>Local:</b> {r.location ?? '—'}</p>
              <p className="text-sm text-gray-700"><b>Início:</b> {r.starts_at ? new Date(r.starts_at).toLocaleString() : '—'}</p>
              <p className="text-sm text-gray-700"><b>Fim:</b> {r.ends_at ? new Date(r.ends_at).toLocaleString() : '—'}</p>
            </div>
            <div className="border rounded p-4">
              <h2 className="font-medium mb-2">Ações</h2>
              <p className="text-sm text-gray-600">Itens, pagamentos e votações entram nas próximas iterações.</p>
            </div>
          </div>
        </div>
      )}
    </SessionGate>
  )
}
