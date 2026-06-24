import Link from 'next/link'

const quickLinks = [
  { label: 'Hakkımda', href: '/hakkimda' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Çalışma Alanları', href: '/calisma-alanlari' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
]

const locationLinks = [
  { label: 'Rize - Yüz Yüze Terapi', href: '/rize-psikolojik-danisman' },
  { label: 'Trabzon - Yüz Yüze Terapi', href: '/trabzon-psikolojik-danisman' },
  { label: 'Türkiye ve Yurt Dışı - Online Terapi', href: '/online-terapi' },
]

export default function Footer() {
  return (
    <footer className="w-full py-section-gap-mobile md:py-16 bg-warm-sand">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="space-y-4">
          <div className="font-headline text-headline-md text-primary">Öznur Yomralı</div>
          <p className="font-body text-body-md text-on-secondary-container">
            Yetişkinler ve çiftlerle çalışan psikoterapist. Rize, Trabzon ve Türkiye ile yurt
            dışına online terapi hizmetleri.
          </p>
          <p className="font-caption text-caption text-on-surface-variant">
            Psikolojik Danışman | Klinik Psikoloji Yüksek Lisans
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-label text-label-md text-primary uppercase tracking-widest">Sayfalar</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-body-md text-on-secondary-container hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label text-label-md text-primary uppercase tracking-widest">Hizmet Bölgeleri</h4>
          <ul className="space-y-2">
            {locationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-body-md text-on-secondary-container hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label text-label-md text-primary uppercase tracking-widest">Bağlantı</h4>
          <div className="flex gap-4">
            <a
              href="https://wa.me/905343500675"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined text-base">chat</span>
            </a>
            <a
              href="https://instagram.com/psikolojikdanisman.oznur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined text-base">photo_camera</span>
            </a>
          </div>
          <p className="font-caption text-caption text-on-surface-variant">
            &copy; {new Date().getFullYear()} Öznur Yomralı. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
