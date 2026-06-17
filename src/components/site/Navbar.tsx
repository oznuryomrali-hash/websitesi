import NavbarClient from './NavbarClient'

const defaultNavItems = [
  { id: '1', label: 'Hakkımda', href: '/hakkimda' },
  { id: '2', label: 'Hizmetler', href: '/hizmetler' },
  { id: '3', label: 'Blog', href: '/blog' },
  { id: '4', label: 'İletişim', href: '/iletisim' },
]

export default async function Navbar() {
  let navItems = defaultNavItems

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = await import('@/lib/supabase-server')
      const supabase = createClient()
      const { data } = await supabase
        .from('menu_items')
        .select('id, label, href, order')
        .eq('is_active', true)
        .order('order')

      if (data && data.length > 0) {
        navItems = data
      }
    }
  } catch {
    // Supabase yapılandırılmamış; varsayılan öğeler kullanılır
  }

  return <NavbarClient navItems={navItems} />
}
