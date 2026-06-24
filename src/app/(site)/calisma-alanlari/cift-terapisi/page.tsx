import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Çift Terapisi',
  description:
    'Çiftler için dinamik çift terapisi. Evlilik çatışmaları, iletişim sorunları, güven ve bağlanma, aldatma ve boşanma süreçlerinde profesyonel destek.',
  alternates: { canonical: '/calisma-alanlari/cift-terapisi' },
}

const topics = [
  'Evlilik çatışmaları ve tekrar eden kavgalar',
  'Evlilikte yalnızlık ve duygusal uzaklık',
  'İletişim problemleri',
  'Güven ve bağlanma sorunları',
  'Aldatma ve aldatılma sonrası süreç',
  'Boşanma sürecinde destek',
  'Ebeveynlikte yaşanan zorluklar',
  'Cinsel uyumsuzluk ve vajinismus (dinamik çalışma)',
  'Cinsel isteksizlik ve intimite sorunları',
  'İlişkide sınır koyamama',
  'Partner seçimindeki örüntüler',
]

export default function CiftTerapisiPage() {
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
            Hizmet
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Çift Terapisi
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            İlişkideki güçlükleri, iletişim sorunlarını ve tekrar eden çatışma örüntülerini
            birlikte keşfetmek için dinamik çift terapisi. İki kişilik ilişkinin üçüncü bir
            gözden görülmesi.
          </p>
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="font-headline text-headline-lg text-primary mb-4">Kimler İçin?</h2>
                <p className="font-body text-body-lg text-on-surface-variant">
                  İlişkisinde aynı sorunların tekrar ettiğini fark eden, iletişim kurmakta
                  zorlandığını hisseden, birbirini anlamak isteyen ancak nasıl yapacağını
                  bilemeyen çiftler için. Evli olmak gerekmez; aynı örüntüyü tekrarlıyor
                  olmak yeterlidir.
                </p>
              </div>
              <div>
                <h2 className="font-headline text-headline-lg text-primary mb-4">Nasıl Çalışıyorum?</h2>
                <p className="font-body text-body-lg text-on-surface-variant">
                  Dinamik çift terapisi yaklaşımıyla iki kişi arasındaki ilişki dinamiklerini,
                  her birinin getirdiği geçmişi ve ilişkinin içinde oluşan örüntüleri birlikte
                  inceliyoruz. Hedef suçlamak değil, anlamak ve dönüşüm için alan açmaktır.
                </p>
              </div>
              <div className="bg-soft-mist rounded-xl p-6 border border-outline-variant">
                <h3 className="font-headline text-headline-md text-primary mb-4">Çalışma Biçimi</h3>
                <ul className="space-y-3">
                  {[
                    'Dinamik çift terapisi yaklaşımı',
                    'Her iki partnerin iç dünyasına odaklanma',
                    'İlişki örüntülerini anlama ve dönüştürme',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-ocean-muted text-base flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
              <h2 className="font-headline text-headline-md text-primary mb-6">
                Çalışılan Konular
              </h2>
              <ul className="space-y-3">
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
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'schedule', title: 'Seans Süresi', desc: 'Her seans yaklaşık 50 dakikadır.' },
              { icon: 'location_on', title: 'Seans Şekli', desc: 'Rize ve Trabzon\'da yüz yüze, Türkiye ve yurt dışına online.' },
              { icon: 'calendar_month', title: 'Randevu', desc: 'WhatsApp üzerinden hızla randevu alabilirsiniz.' },
            ].map((item) => (
              <div key={item.title} className="bg-soft-mist rounded-xl p-6 border border-outline-variant flex items-start gap-4">
                <span className="material-symbols-outlined text-2xl text-ocean-muted flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-headline text-headline-md text-primary">{item.title}</p>
                  <p className="font-body text-body-md text-on-surface-variant mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://wa.me/905343500675?text=Merhaba%2C%20%C3%A7ift%20terapisi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
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
              Diğer hizmetler
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
