'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import SessionGate from '@/components/SessionGate'

export default function NewResenha() {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert('Faça login.')
    const { data, error } = await supabase.from('resenhas').insert({
      owner_id: user.id,
      title,
      location,
      starts_at: startsAt ? new Date(startsAt).toISOString() : null,
      ends_at: endsAt ? new Date(endsAt).toISOString() : null,
      categories: ['comidas']
    }).select('id').single()
    if (error) alert(error.message)
    else router.replace(`/resenhas/${data!.id}`)
  }

  return (
    <SessionGate>
      <h1 className="text-2xl font-semibold mb-4">Criar Resenha</h1>
      <form onSubmit={submit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Título</label>
          <input className="w-full border rounded px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Local</label>
          <input className="w-full border rounded px-3 py-2" value={location} onChange={e=>setLocation(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Início</label>
            <input type="datetime-local" className="w-full border rounded px-3 py-2" value={startsAt} onChange={e=>setStartsAt(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Fim</label>
            <input type="datetime-local" className="w-full border rounded px-3 py-2" value={endsAt} onChange={e=>setEndsAt(e.target.value)} />
          </div>
        </div>
        <button className="px-4 py-2 rounded bg-black text-white">Salvar</button>
      </form>
    </SessionGate>
  )
}
