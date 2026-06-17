'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const navItems = [
  { label: 'Özet', href: '/admin/dashboard', icon: 'dashboard' },
  { label: 'İçerik', href: '/admin/icerik', icon: 'edit_note' },
  { label: 'Blog', href: '/admin/blog', icon: 'article' },
  { label: 'Danışanlar', href: '/admin/danisanlar', icon: 'group' },
  { label: 'Randevular', href: '/admin/randevular', icon: 'calendar_month' },
  { label: 'Şablonlar', href: '/admin/sablonlar', icon: 'chat' },
  { label: 'Menü', href: '/admin/menu', icon: 'menu' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-surface border-r border-outline-variant min-h-screen flex flex-col">
      <div className="p-6 border-b border-outline-variant">
        <p className="font-headline text-headline-md text-primary">Admin Panel</p>
        <p className="font-caption text-caption text-on-surface-variant mt-1">Öznur Yomralı</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label text-label-md transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-outline-variant space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 rounded-lg font-label text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-xl">open_in_new</span>
          Siteyi gör
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-label text-label-md text-error hover:bg-error-container/20 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          Çıkış yap
        </button>
      </div>
    </aside>
  )
}
