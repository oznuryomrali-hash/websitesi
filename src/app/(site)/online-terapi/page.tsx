import type { Metadata } from 'next'
import ContactSection from '@/components/site/ContactSection'
import JsonLd from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oznuryomrali.com'

export const metadata: Metadata = {
  title: "Online Terapi | Türkiye Geneli Psikolojik Danışmanlık",
  description:
    "Türkiye'nin her yerinden online psikolojik danışmanlık. Güvenli, esnek ve profesyonel bireysel terapi ve çift terapisi seansları.",
  alternates: { canonical: '/online-terapi' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ServiceChannel',
  name: 'Online Terapi - Öznur Yomralı',
  serviceUrl: `${siteUrl}/online-terapi`,
  availableLanguage: 'Turkish',
  provider: {
    '@type': 'Psychologist',
    name: 'Öznur Yomralı',
    telephone: '+905343500675',
  },
}

const faqs = [
  {
    question: 'Online terapi nasıl işliyor?',
    answer:
      'Güvenli bir video görüşme platformu üzerinden birebir seans gerçekleştirilir. Seans öncesinde platforma dair bilgi paylaşılır.',
  },
  {
    question: 'Online terapi yüz yüze kadar etkili mi?',
    answer:
      'Araştırmalar, online terapinin birçok alanda yüz yüze terapi kadar etkili olduğunu göstermektedir. Önemli olan danışanla kurulan güvenli ilişkidir.',
  },
  {
    question: 'Nelerden randevu alabilirim?',
    answer:
      'WhatsApp üzerinden iletişime geçerek uygun seans zamanını birlikte belirleyebiliriz.',
  },
  {
    question: "Türkiye'nin her yerinden seans alabilir miyim?",
    answer:
      "Evet, Türkiye'nin herhangi bir şehrinden online seans alabilirsiniz. Yurt dışında yaşayan Türk vatandaşları için de seans imkanı mevcuttur.",
  },
]

export default function OnlineTerapiPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Türkiye Geneli
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Online Terapi
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Nerede olursanız olun, güvenli ve profesyonel bir ortamda psikolojik destek alabilirsiniz.
          </p>
        </div>
      </div>

      {/* Özellikler */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="font-headline text-headline-lg text-primary">
                Online Terapinin Avantajları
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                Online terapi, coğrafi engelleri ortadan kaldırarak Türkiye'nin her yerinden
                profesyonel psikolojik destek almanıza olanak tanır. Evinizin konforunda, güvenli
                bir ortamda terapi süreci yürütülür.
              </p>
              <div className="space-y-4">
                {[
                  'Zaman ve mekan esnekliği',
                  "Türkiye'nin her yerinden erişim",
                  'Güvenli ve gizli platform',
                  'Yüz yüze terapi kadar etkili',
                  'Şehir dışında yaşayanlar için ideal',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-ocean-muted text-xl flex-shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <p className="font-body text-body-md text-on-surface-variant">{item}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/905343500675?text=Merhaba%2C%20online%20terapi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-label-md hover:opacity-80 transition-opacity"
              >
                Online seans al
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>

            <div className="bg-soft-mist rounded-xl p-8 border border-outline-variant">
              <h3 className="font-headline text-headline-md text-primary mb-6">
                Nasıl başlarım?
              </h3>
              <ol className="space-y-6">
                {[
                  { step: '1', title: 'İletişime geç', desc: 'WhatsApp üzerinden mesaj gönderin.' },
                  { step: '2', title: 'Seans zamanı belirle', desc: 'Birlikte uygun bir zaman dilimi belirleyelim.' },
                  { step: '3', title: 'Platforma katıl', desc: 'Belirtilen saatte güvenli video görüşme platformuna bağlanın.' },
                  { step: '4', title: 'Süreci başlat', desc: 'İlk seansınızda kendinizi ve beklentilerinizi paylaşın.' },
                ].map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label text-label-md flex items-center justify-center flex-shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-headline text-headline-md text-primary">{s.title}</p>
                      <p className="font-body text-body-md text-on-surface-variant mt-1">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <h2 className="font-headline text-headline-lg text-primary mb-12 text-center">
            Sık Sorulan Sorular
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-surface rounded-xl p-6 border border-warm-sand">
                <h3 className="font-headline text-headline-md text-primary mb-3">{faq.question}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
