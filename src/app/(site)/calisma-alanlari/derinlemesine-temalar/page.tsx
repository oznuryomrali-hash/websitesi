import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Derinlemesine Çalıştığım Temalar',
  description:
    'Tekrarlayan ilişki örüntüleri, değersizlik duyguları, terk edilme korkusu, sınır koyamama, mükemmeliyetçilik, ölüm korkusu ve varoluşsal kaygılar üzerine psikoterapi.',
  alternates: { canonical: '/calisma-alanlari/derinlemesine-temalar' },
}

const topics = [
  'Tekrarlayan ilişki örüntüleri',
  'Değersizlik / yetersizlik duyguları',
  'Terk edilme korkusu',
  'Yalnız kalma korkusu',
  'Sınır koyamama / hayır demede güçlük',
  'Bağımlılıklar',
  'Mükemmeliyetçilik',
  'Onay arayışı',
  'Suçluluk',
  'Takıntılar',
  'Özgüven sorunları',
  'Kimlik ve benlik gelişimi',
  'Görünür olma ve başarılı olma korkuları',
  'Yoğun kaygılı varoluşsal çatışmalar',
  'Ölüm ve yok olma korkuları',
  'Kontrolü kaybetme korkusu',
  'Delireceği ve kendine hakim olamayacağı düşünceleri',
  'Belirsizliğe tahammülsüzlük',
]

export default function DerinlemesineTemalarPage() {
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
            Derinlemesine Çalıştığım Temalar
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Bazı örüntüler derinlerde kök salmıştır ve yüzeysel müdahalelerle değişmez.
            Bu temalar, psikodinamik yaklaşımla, zamanla ve sabirla birlikte ele alınır.
          </p>
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">psychiatry</span>
              </div>
              <h2 className="font-headline text-headline-md text-primary mb-6">Çalışılan Konular</h2>
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

            <div className="space-y-6">
              <div className="bg-soft-mist rounded-xl p-8 border border-outline-variant">
                <h2 className="font-headline text-headline-md text-primary mb-4">Bu Temaları Neden Önemsiyorum?</h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Bu konular çoğunlukla "sadece böyleyim" veya "geçer" diye görmezden gelinir.
                  Ancak bu temalar, yaşamın kalitesini derinden etkileyen, ilişkileri ve kimliği
                  biçimlendiren köklü örüntülerdir. Psikodinamik terapi bu temaların kaynağına
                  inmeyi ve dönüşüm için alan açmayı hedefler.
                </p>
              </div>
              <div className="bg-ocean-muted text-on-primary rounded-xl p-8">
                <span className="material-symbols-outlined text-3xl block mb-4">psychology</span>
                <h3 className="font-headline text-headline-md mb-2">Psikodinamik Yaklaşım</h3>
                <p className="font-body text-body-md opacity-90">
                  Belirtilerin altındaki anlama ulaşmak, geçmişin şimdiye etkisini görmek ve
                  derinlemesine farkındalık geliştirmek için çalışıyoruz.
                </p>
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
