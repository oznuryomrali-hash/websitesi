import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    "Psikolojik Danışman Öznur Yomralı ile iletişime geçin. WhatsApp üzerinden randevu alın. Rize, Trabzon ve online terapi.",
  alternates: { canonical: '/iletisim' },
}

export default function IletisimPage() {
  const whatsappUrl =
    'https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum.'

  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Ulaşın
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            İletişim
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Sormak istediğiniz sorular ya da seans planlamak için WhatsApp üzerinden ulaşabilirsiniz.
          </p>
        </div>
      </div>

      {/* İletişim içeriği */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Sol - WhatsApp */}
            <div className="space-y-8">
              <div>
                <h2 className="font-headline text-headline-lg text-primary mb-4">
                  Nasıl ulaşabilirim?
                </h2>
                <p className="font-body text-body-lg text-on-surface-variant">
                  Randevu almak veya sormak istediğiniz sorular için WhatsApp üzerinden doğrudan
                  benimle iletişime geçebilirsiniz.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] text-white px-8 py-5 rounded-xl font-label text-label-md hover:brightness-110 transition-all shadow-lg shadow-[#25D366]/20 w-full justify-center md:justify-start md:w-auto"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                +90 534 350 06 75
              </a>

              <a
                href="https://instagram.com/psikolojikdanisman.oznur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border-2 border-outline-variant text-on-surface-variant px-8 py-5 rounded-xl font-label text-label-md hover:border-primary hover:text-primary transition-all w-full justify-center md:justify-start md:w-auto"
              >
                <span className="material-symbols-outlined">photo_camera</span>
                @psikolojikdanisman.oznur
              </a>
            </div>

            {/* Sag - Bilgiler */}
            <div className="space-y-6">
              <h2 className="font-headline text-headline-lg text-primary">Hizmet bölgeleri</h2>
              {[
                {
                  icon: 'location_on',
                  title: 'Rize',
                  desc: "Rize'de anlaşmalı ofis aracılığıyla yüz yüze seans.",
                },
                {
                  icon: 'location_on',
                  title: 'Trabzon',
                  desc: "Trabzon'da anlaşmalı ofis aracılığıyla yüz yüze seans.",
                },
                {
                  icon: 'laptop_mac',
                  title: 'Online',
                  desc: "Türkiye'nin her yerinden online seans imkanı.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-surface rounded-xl p-6 border border-warm-sand"
                >
                  <span className="material-symbols-outlined text-2xl text-ocean-muted flex-shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-headline text-headline-md text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-body-md text-on-surface-variant">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
