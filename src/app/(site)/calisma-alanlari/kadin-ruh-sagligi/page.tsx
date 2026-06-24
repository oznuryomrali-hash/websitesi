import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Kadın Ruh Sağlığı',
  description:
    'Kadın kimliği, annelik, beden algısı, vajinismus, cinsel isteksizlik, doğum sonrası depresyon ve daha fazlası üzerine psikoterapi.',
  alternates: { canonical: '/calisma-alanlari/kadin-ruh-sagligi' },
}

const topics = [
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
]

export default function KadinRuhSagligiPage() {
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
            Kadın Ruh Sağlığı
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Kadın olmak; doğayla, bedenle, annelikle, cinsellikle ve toplumsal beklentilerle
            süregelen bir ilişkidir. Bu ilişkinin içinde taşınan ağırlıklar zaman zaman görünmez
            kalır. Bu alanlarda derinlemesine çalışıyorum.
          </p>
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">female</span>
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
                <h2 className="font-headline text-headline-md text-primary mb-4">Bu Alanda Nasıl Çalışıyorum?</h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Kadın ruh sağlığı konularında çalışırken yargılamayan, saygılı ve güvenli bir
                  alan oluşturmak önceliğim. Beden, cinsellik veya annelik hakkında konuşmak
                  zaman zaman utanç veya mahcubiyet getirebilir. Bu duyguları da sürecin bir
                  parçası olarak birlikte taşırız.
                </p>
              </div>
              <div className="bg-ocean-muted text-on-primary rounded-xl p-8">
                <span className="material-symbols-outlined text-3xl block mb-4">shield</span>
                <h3 className="font-headline text-headline-md mb-2">Güvenli Alan</h3>
                <p className="font-body text-body-md opacity-90">
                  Bu konular hakkında yargılanmadan, dürüstçe konuşabileceğiniz bir terapi
                  ortamı sunuyorum.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
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
