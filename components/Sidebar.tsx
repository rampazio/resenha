'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/resenhas', label: 'Resenhas' },
  { href: '/votacoes', label: 'Votações' },
  { href: '/comidas', label: 'Comidas' },
];

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-56 border-r h-screen sticky top-0 bg-white">
      <div className="px-4 py-4 font-semibold">Resenha App</div>
      <nav className="flex flex-col gap-1 px-2">
        {links.map(l => (
          <Link key={l.href} href={l.href}
            className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname===l.href ? 'bg-gray-100 font-medium' : ''}`}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 text-xs text-gray-500 mt-auto">MVP</div>
    </aside>
  )
}
