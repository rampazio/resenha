'use client'

import { supabase } from '@/lib/supabaseClient'

export default function AuthButton() {
  const signIn = async () => {
    const email = prompt('Digite seu email para receber o link mágico:')
    if (!email) return
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    if (error) alert(error.message)
    else alert('Verifique seu email! Enviamos um link de login.')
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="flex gap-2">
      <button onClick={signIn} className="px-3 py-1 rounded border">Entrar</button>
      <button onClick={signOut} className="px-3 py-1 rounded border">Sair</button>
    </div>
  )
}
