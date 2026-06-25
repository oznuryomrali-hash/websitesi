import NavbarClient from './NavbarClient'

const defaultNavItems = [
  { id: '1', label: 'Hakkımda', href: '/#hakkimda', parent_id: null },
  { id: '2', label: 'Çalışma Alanlarım', href: '/calisma-alanlari', parent_id: null },
  { id: '2a', label: 'Bireysel Terapi', href: '/calisma-alanlari/bireysel-terapi', parent_id: '2' },
  { id: '2b', label: 'Çift Terapisi', href: '/calisma-alanlari/cift-terapisi', parent_id: '2' },
  { id: '2c', label: 'Kadın Ruh Sağlığı', href: '/calisma-alanlari/kadin-ruh-sagligi', parent_id: '2' },
  { id: '2d', label: 'İlişkiler ve Çift', href: '/calisma-alanlari/iliskiler-ve-cift', parent_id: '2' },
  { id: '2e', label: 'Psikosomatik', href: '/calisma-alanlari/psikosomatik', parent_id: '2' },
  { id: '2f', label: 'Derinlemesine Temalar', href: '/calisma-alanlari/derinlemesine-temalar', parent_id: '2' },
  { id: '3', label: 'Blog', href: '/blog', parent_id: null },
  { id: '4', label: 'İletişim', href: '/#iletisim', parent_id: null },
]

export default async function Navbar() {
  let navItems = defaultNavItems

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = await import('@/lib/supabase-server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('menu_items')
        .select('id, label, href, order, parent_id')
        .eq('is_active', true)
        .order('order')

      if (data && data.length > 0) {
        navItems = data
      }
    }
  } catch {
    // Varsayılan öğeler kullanılır
  }

  return <NavbarClient navItems={navItems} />
}
