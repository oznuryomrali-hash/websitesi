import type { Metadata } from 'next'
import ContactSection from '@/components/site/ContactSection'
import JsonLd from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oznuryomrali.com'

export const metadata: Metadata = {
  title: "Rize Psikolojik Danışman | Bireysel ve Çift Terapisi",
  description:
    "Rize'de psikolojik danışmanlık arıyorsanız doğru adrestesiniz. Öznur Yomralı ile Rize'de yüz yüze bireysel terapi ve çift terapisi seansları.",
  alternates: { canonical: '/rize-psikolojik-danisman' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Psychologist'],
  name: "Rize Psikolojik Danışman - Öznur Yomralı",
  url: `${siteUrl}/rize-psikolojik-danisman`,
  telephone: '+905343500675',
  areaServed: { '@type': 'City', name: 'Rize' },
  sameAs: ['https://instagram.com/psikolojikdanisman.oznur'],
}

export default function RizePage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Rize
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Rize'de Psikolojik Danışman
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Rize'de anlaşmalı ofis aracılığıyla yüz yüze bireysel terapi ve çift terapisi
            hizmetleri.
          </p>
        </div>
      </div>

      {/* İçerik */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="font-headline text-headline-lg text-primary">
                Rize'de Psikolojik Danışmanlık
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                Rize'de profesyonel bir psikolojik danışman arıyorsanız, anlaşmalı ofis
                aracılığıyla yüz yüze seans hizmeti sunuyorum. Her seans saatlik çalışma
                modeliyle planlanır.
              </p>
              <p className="font-body text-body-lg text-on-surface-variant">
                Bireysel terapi, çift terapisi ve psikoterapi seansları için Rize'de
                randevu alabilirsiniz. Dinamik, aktarım odaklı ve gelişimsel psikoterapiler
                çerçevesinde çalışıyorum.
              </p>
              <a
                href="https://wa.me/905343500675?text=Merhaba%2C%20Rize'deki%20seans%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-label-md hover:opacity-80 transition-opacity"
              >
                Rize randevusu al
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>

            <div className="space-y-4">
              {[
                { icon: 'check_circle', text: 'Rize merkezde anlaşmalı ofiste seans' },
                { icon: 'check_circle', text: 'Bireysel terapi - yetişkinler' },
                { icon: 'check_circle', text: 'Çift terapisi' },
                { icon: 'check_circle', text: 'Saatlik seans modeli' },
                { icon: 'check_circle', text: 'Gizlilik ve güvenli ortam' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 bg-surface rounded-xl p-4 border border-warm-sand">
                  <span
                    className="material-symbols-outlined text-ocean-muted text-xl flex-shrink-0 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <p className="font-body text-body-md text-on-surface-variant">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
