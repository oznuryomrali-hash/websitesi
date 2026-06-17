import Link from 'next/link'
import type { SiteContent } from '@/lib/content'
import { c } from '@/lib/content'

interface Props {
  content?: SiteContent
}

export default function Hero({ content = {} }: Props) {
  const title = c(content, 'hero_baslik', 'Kendinizi ve ilişkilerinizi daha iyi anlamanın tam zamanı.')
  const subtitle = c(content, 'hero_alt_metin', 'Merhaba, ben Öznur Yomralı. Bireylerin ve çiftlerin iç dünyalarını keşfetmelerine, tekrar eden örüntüleri fark etmelerine ve daha derin bir özgürlük kazanmalarına destek oluyorum.')

  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-section-gap-desktop overflow-hidden">
      <div className="absolute inset-0 tonal-layer z-0" />
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block font-label text-label-md text-ocean-muted uppercase tracking-widest mb-2">
            Psikolojik Danışman
          </span>
          <h1 className="font-display text-4xl md:text-display-lg text-primary tracking-tight leading-tight">
            {title}
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ocean-muted text-on-primary px-10 py-4 rounded-full font-label text-label-md transition-all duration-300 hover:brightness-110 shadow-lg shadow-ocean-muted/20"
            >
              WhatsApp ile Yaz
            </a>
            <Link
              href="/hizmetler"
              className="border-2 border-ocean-muted text-ocean-muted px-10 py-4 rounded-full font-label text-label-md transition-all duration-300 hover:bg-ocean-muted hover:text-on-primary"
            >
              Hizmetleri Keşfet
            </Link>
          </div>
          <div className="flex justify-center gap-8 pt-8 text-on-surface-variant">
            <div className="text-center">
              <p className="font-headline text-headline-md text-primary">10+</p>
              <p className="font-body text-caption">Yıllık deneyim</p>
            </div>
            <div className="w-px bg-outline-variant" />
            <div className="text-center">
              <p className="font-headline text-headline-md text-primary">2</p>
              <p className="font-body text-caption">Şehirde yüz yüze</p>
            </div>
            <div className="w-px bg-outline-variant" />
            <div className="text-center">
              <p className="font-headline text-headline-md text-primary">Online</p>
              <p className="font-body text-caption">Tüm Türkiye</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
