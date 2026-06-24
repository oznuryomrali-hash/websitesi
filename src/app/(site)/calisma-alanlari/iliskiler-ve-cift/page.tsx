import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'İlişkiler ve Çift Terapisi',
  description:
    'Evlilik çatışmaları, iletişim sorunları, güven ve bağlanma sorunları, aldatma, boşanma ve ebeveynlikte yaşanan zorluklar üzerine psikoterapi.',
  alternates: { canonical: '/calisma-alanlari/iliskiler-ve-cift' },
}

const topics = [
  'Evlilik çatışmaları',
  'Evlilikte yalnızlık hissi',
  'İletişim problemleri',
  'Güven ve bağlanma sorunları',
  'Aldatma',
  'Aldatılma',
  'Boşanma süreci',
  'Ebeveynlikte yaşanan zorluklar',
]

export default function IliskilerVeCiftPage() {
  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <Link
            href="/calisma-alanlari"
            className="inline-flex items-center gap-2 font-label text-label-md text-on-surface-variant hover:text-primary transition-colors mb-8"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Çalışma Alanlarım
          </Link>
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest block">
            Çalışma Alanı
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            İlişkiler ve Çift Terapisi
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            İlişkiler, en derin iyileşme alanlarımızdan biridir. Aynı zamanda en zorlu olanıdır.
            Bireysel ya da çift olarak, ilişki örüntülerinizi birlikte keşfedebiliriz.
          </p>
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">diversity_3</span>
              </div>
              <h2 className="font-headline text-headline-md text-primary mb-6">Çalışılan Konular</h2>
              <ul className="space-y-4">
                {topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3 font-body text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-ocean-muted text-base mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-soft-mist rounded-xl p-8 border border-outline-variant">
                <h2 className="font-headline text-headline-md text-primary mb-4">Bireysel mi, Çift mi?</h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  İlişki sorunları hem bireysel terapi hem de çift terapisi aracılığıyla
                  çalışılabilir. Bazen birinin iç dünyasını anlamak ilişkiyi de dönüştürür.
                  Bazen iki kişinin birlikte sürecin içinde olması gerekir. Birlikte değerlendiririz.
                </p>
              </div>
              <div className="bg-ocean-muted text-on-primary rounded-xl p-8">
                <span className="material-symbols-outlined text-3xl block mb-4">favorite</span>
                <h3 className="font-headline text-headline-md mb-2">Çift Terapisi Hakkında</h3>
                <p className="font-body text-body-md opacity-90 mb-4">
                  Çift terapisi detayları ve nasıl çalıştığım hakkında daha fazla bilgi alın.
                </p>
                <Link
                  href="/calisma-alanlari/cift-terapisi"
                  className="inline-flex items-center gap-2 bg-on-primary/20 hover:bg-on-primary/30 text-on-primary px-6 py-2 rounded-full font-label text-label-md transition-colors"
                >
                  Çift Terapisi
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-label-md hover:opacity-80 transition-opacity"
                >
                  Seans al
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
                <Link
                  href="/calisma-alanlari"
                  className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 rounded-full font-label text-label-md hover:bg-primary hover:text-on-primary transition-all"
                >
                  Diğer konular
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
