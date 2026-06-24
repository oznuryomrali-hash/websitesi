import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Eğitimlerim',
  description:
    'Psikolojik Danışman Öznur Yomralı mesleki eğitim geçmişi. Dinamik bütüncül terapi, aktarım odaklı terapi, EMDR, EFT ve diğer psikoterapi eğitimleri.',
  alternates: { canonical: '/egitimlerim' },
}

const trainings = [
  {
    title: 'Dinamik Bütüncül Terapi',
    duration: '288 saat',
    icon: 'psychology',
  },
  {
    title: 'Aktarım Odaklı Terapi',
    duration: '32 saat',
    icon: 'connect_without_contact',
  },
  {
    title: 'Psikoterapide Gelişimsel Yaklaşımlar',
    duration: '10 ay',
    icon: 'timeline',
  },
  {
    title: 'Klinik Uygulamada Sanat Terapisi',
    duration: '28 saat',
    icon: 'palette',
  },
  {
    title: 'Dışavurumcu Oyun Terapisi',
    duration: '28 saat',
    icon: 'toys',
  },
  {
    title: 'Aile Danışmanlığı',
    duration: '',
    icon: 'family_restroom',
  },
  {
    title: 'Dinamik Çift Terapisi Uygulama Kampı',
    duration: '4 gün',
    icon: 'favorite',
  },
  {
    title: 'EMDR',
    duration: '',
    icon: 'visibility',
  },
  {
    title: 'EFT (Duygusal Odak Terapisi)',
    duration: '',
    icon: 'self_improvement',
  },
]

export default function EgitimlerimPage() {
  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <Link
            href="/hakkimda"
            className="inline-flex items-center gap-2 font-label text-label-md text-on-surface-variant hover:text-primary transition-colors mb-8"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Hakkımda sayfasına dön
          </Link>
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest block">
            Mesleki Gelişim
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Eğitimlerim
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            2014 yılında PDR lisans eğitimimin ardından psikoterapi alanında çeşitli kapsamlı
            eğitimler aldım. Bu süreç hâlâ devam etmektedir.
          </p>
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {trainings.map((training, index) => (
                <div
                  key={training.title}
                  className="flex items-center gap-6 bg-surface rounded-xl p-6 border border-warm-sand soft-card-shadow group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined">{training.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-headline text-headline-md text-primary">{training.title}</p>
                    {training.duration && (
                      <p className="font-body text-body-md text-on-surface-variant mt-1">
                        {training.duration}
                      </p>
                    )}
                  </div>
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-label text-label-md flex-shrink-0">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-soft-mist border border-outline-variant rounded-xl p-8">
              <span className="material-symbols-outlined text-3xl text-ocean-muted block mb-4">
                school
              </span>
              <h2 className="font-headline text-headline-md text-primary mb-4">
                Akademik Geçmiş
              </h2>
              <ul className="space-y-3">
                {[
                  'Psikolojik Danışmanlık ve Rehberlik Lisans (2014)',
                  'Klinik Psikoloji Yüksek Lisans (devam ediyor)',
                ].map((item) => (
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
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
