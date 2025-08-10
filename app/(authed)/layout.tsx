import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export default function AuthedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/">Dashboard</Link>
          </div>
          <a href="/login" className="text-sm underline">Conta</a>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
