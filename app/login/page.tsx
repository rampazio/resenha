'use client'
import AuthButton from '@/components/AuthButton'
import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/')
    })
  }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-2">Entrar</h1>
        <p className="text-sm text-gray-600 mb-6">Use o link mágico por email para acessar.</p>
        <AuthButton />
      </div>
    </div>
  )
}
