import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Çalışma Alanları',
  description:
    'Psikolojik Danışman Öznur Yomralı çalışma alanları: Kadın ruh sağlığı, ilişkiler ve çift terapisi, psikosomatik zorluklar, derinlemesine temalar.',
  alternates: { canonical: '/calisma-alanlari' },
}

const areas = [
  {
    icon: 'female',
    title: 'Kadın Ruh Sağlığı',
    items: [
      'Kadınlıkla ilgili içsel çatışmalar',
      'Beden algısında bozulma',
      'Tıbbi olarak açıklanamayan infertilite',
      'Tıbbi olarak açıklanamayan tekrarlayan düşükler',
      'Doğum sonrası depresyonu',
      'Kadın kimliğinde yaşanan zorluklar (cinsellik, regl, gebelik)',
      'Vajinismus (dinamik çalışma)',
      'Kadınlarda cinsel isteksizlik',
      'Kadınlarda utanç',
      'Annelik suçluluğu',
    ],
  },
  {
    icon: 'favorite',
    title: 'İlişkiler ve Çift Terapisi',
    items: [
      'Evlilik çatışmaları',
      'Evlilikte yalnızlık hissi',
      'İletişim problemleri',
      'Güven ve bağlanma sorunları',
      'Aldatma / Aldatılma',
      'Boşanma',
      'Ebeveynlikte yaşanan zorluklar',
    ],
  },
  {
    icon: 'monitor_heart',
    title: 'Psikosomatik ve Duygusal Zorluklar',
    items: [
      'Nedeni açıklanamayan bedensel ağrılar, belirtiler ve yakınmalar',
      'Kronik ağrılar',
      'Kaygı',
      'Panik atak',
      'Depresyon',
      'Yas süreçleri',
      'Kronik stres',
    ],
  },
  {
    icon: 'psychiatry',
    title: 'Derinlemesine Çalıştığım Temalar',
    items: [
      'Tekrarlayan ilişki örüntüleri',
      'Değersizlik / yetersizlik duyguları',
      'Terk edilme korkusu',
      'Yalnız kalma korkusu',
      'Sınır koyamama / hayır demede güçlük',
      'Bağımlılıklar',
      'Mükemmeliyetçilik',
      'Onay arayışı ve suçluluk',
      'Takıntılar',
      'Özgüven sorunları',
      'Kimlik ve benlik gelişimi',
      'Görünür olma ve başarılı olma korkuları',
      'Yoğun kaygılı varoluşsal çatışmalar',
      'Ölüm ve yok olma korkuları',
      'Kontrolü kaybetme korkusu',
      'Delireceği ve kendine hakim olamayacağı düşünceleri',
      'Belirsizliğe tahammülsüzlük',
    ],
  },
]

export default function CalısmaAlanlariPage() {
  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 font-label text-label-md text-on-surface-variant hover:text-primary transition-colors mb-8"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Hizmetlere dön
          </Link>
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest block">
            Çalışmalarım
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Çalışma Alanları
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Bireysel ve çift terapisinde yetişkinler, ergenler ve çiftlerle çalışıyorum. Aşağıda
            özellikle odaklandığım konu başlıklarını bulabilirsiniz.
          </p>
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area) => (
              <div
                key={area.title}
                className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">{area.icon}</span>
                  </div>
                  <h2 className="font-headline text-headline-md text-primary">{area.title}</h2>
                </div>
                <ul className="space-y-3">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-body-md text-on-surface-variant"
                    >
                      <span
                        className="material-symbols-outlined text-ocean-muted text-base mt-0.5 flex-shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-ocean-muted/10 border border-ocean-muted/20 rounded-xl p-8 md:p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-ocean-muted block mb-4">
              info
            </span>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Bu listede adı geçmeyen bir konu için destek almak istiyorsanız lütfen iletişime
              geçin. Her bireyin durumu kendine özgüdür; birlikte değerlendirebiliriz.
            </p>
            <a
              href="https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-label-md hover:opacity-80 transition-opacity mt-8"
            >
              WhatsApp ile iletişime geç
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
