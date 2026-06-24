import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Hizmetler',
  description:
    'Bireysel terapi ve çift terapisi hizmetleri. Rize ve Trabzon\'da yüz yüze, tüm Türkiye\'de online seanslar.',
  alternates: { canonical: '/hizmetler' },
}

const services = [
  {
    icon: 'person',
    title: 'Bireysel Terapi',
    description:
      'Bireysel terapi, kişinin kendisiyle, duygularıyla ve yaşam öyküsüyle daha derin bir bağ kurmasını destekleyen birebir bir süreçtir.',
    details: [
      'Yetişkinlerle çalışma',
      'Dinamik ve aktarım odaklı yaklaşım',
      'Tekrar eden örüntüleri fark etme',
      'İlişki dinamiklerini anlama',
      'Duygusal farkındalık geliştirme',
    ],
  },
  {
    icon: 'favorite',
    title: 'Çift Terapisi',
    description:
      'Çift terapisi, iki kişi arasındaki ilişki dinamiklerini, iletişim sorunlarını ve tekrar eden çatışma örüntülerini birlikte keşfetmeyi amaçlar.',
    details: [
      'İletişim sorunları',
      'Çatışma yönetimi',
      'Sınır belirleme',
      'Güven ve bağlanma',
      'İlişki örüntülerini anlama',
    ],
  },
]

export default function HizmetlerPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Ne Sunuyorum
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Hizmetler
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Bireysel terapi ve çift terapisi alanlarında yüz yüze ve online hizmet sunuyorum.
          </p>
        </div>
      </div>

      {/* Hizmetler */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-4xl">{service.icon}</span>
                </div>
                <h2 className="font-headline text-headline-lg text-primary mb-4">
                  {service.title}
                </h2>
                <p className="font-body text-body-lg text-on-surface-variant mb-8">
                  {service.description}
                </p>
                <a
                  href="https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-label-md hover:opacity-80 transition-opacity"
                >
                  Seans planla
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
              <div className={`bg-soft-mist rounded-xl p-8 border border-outline-variant ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className="font-headline text-headline-md text-primary mb-6">
                  Çalışma alanları
                </h3>
                <ul className="space-y-4">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 font-body text-body-md text-on-surface-variant"
                    >
                      <span
                        className="material-symbols-outlined text-ocean-muted text-base mt-0.5 flex-shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Çalışma Alanları CTA */}
      <section className="py-12 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
            <div>
              <h2 className="font-headline text-headline-md text-primary mb-2">
                Hangi konularda çalışıyorum?
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Bireysel terapi ve çift terapisinde özellikle odaklandığım alanların tümünü
                görüntüleyin.
              </p>
            </div>
            <Link
              href="/calisma-alanlari"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-label-md hover:opacity-80 transition-opacity"
            >
              Çalışma Alanları
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Seans bilgisi */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-12">
            <h2 className="font-headline text-headline-lg text-primary">Seans Bilgisi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'schedule',
                title: 'Seans Süresi',
                desc: 'Her seans yaklaşık 50 dakikadır.',
              },
              {
                icon: 'location_on',
                title: 'Hizmet Şekli',
                desc: 'Rize ve Trabzon\'da yüz yüze, tüm Türkiye\'de online.',
              },
              {
                icon: 'calendar_month',
                title: 'Randevu',
                desc: 'WhatsApp üzerinden hızla randevu oluşturabilirsiniz.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow text-center"
              >
                <span className="material-symbols-outlined text-4xl text-ocean-muted block mb-4">
                  {item.icon}
                </span>
                <h3 className="font-headline text-headline-md text-primary mb-3">{item.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
