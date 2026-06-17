import type { Metadata } from 'next'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Hakkımda',
  description:
    "Psikolojik Danışman Öznur Yomralı hakkında bilgi edinin. PDR mezunu, klinik psikoloji yüksek lisans öğrencisi. Dinamik ve aktarım odaklı psikoterapiler.",
  alternates: { canonical: '/hakkimda' },
}

export default function HakkimdaPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Hakkımda
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Ben Kimim?
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Psikolojik Danışman olarak bireylerin ve çiftlerin iç dünyalarını keşfetmelerine destek
            oluyorum.
          </p>
        </div>
      </div>

      {/* Biyografi */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="font-headline text-headline-lg text-primary">Eğitim ve Deneyim</h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                2014 yılında Psikolojik Danışmanlık ve Rehberlik lisans eğitimimi tamamladım.
                2020'den beri psikoterapi alanında eğitimler almaktayım. Şu an klinik psikoloji
                yüksek lisansına devam etmekteyim.
              </p>
              <p className="font-body text-body-lg text-on-surface-variant">
                Dinamik, aktarım odaklı ve gelişimsel psikoterapiler üzerine çeşitli eğitimler
                aldım. Yetişkinler ve çiftlerle çalışıyor; bireysel terapi ve çift terapisi hizmeti
                sunuyorum.
              </p>
              <p className="font-body text-body-lg text-on-surface-variant">
                Çalışmalarımda yalnızca belirtilere değil, kişinin iç dünyasına, ilişki
                örüntülerine ve yaşam öyküsüne odaklanıyorum.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="font-headline text-headline-lg text-primary">Yaklaşımım</h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                Bazen yaşadığımız sorunların neden tekrar ettiğini bilmeden aynı döngülerin içinde
                kalabiliriz. İlişkilerde benzer güçlükleri yaşayabilir, kendimizi anlamakta
                zorlanabilir ya da hayatımızda değişmesini istediğimiz şeyleri değiştiremediğimizi
                hissedebiliriz.
              </p>
              <p className="font-body text-body-lg text-on-surface-variant">
                Terapi sürecinde amacım, görünmeyen örüntülerin görünür hale gelmesine yardımcı
                olmak ve kişinin kendisiyle, duygularıyla ve ilişkileriyle daha derin bir bağ
                kurabilmesini desteklemektir.
              </p>
              <p className="font-body text-body-lg text-on-surface-variant">
                Bu süreç, kişinin yaşamındaki seçimler üzerinde daha fazla farkındalık ve özgürlük
                kazanmasına alan açar.
              </p>
            </div>
          </div>

          {/* Uzmanlık alanları */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'school',
                title: 'Eğitim',
                items: [
                  'PDR Lisans (2014)',
                  'Klinik Psikoloji Yüksek Lisans (devam)',
                  'Psikoterapi eğitimleri (2020-)',
                ],
              },
              {
                icon: 'psychology',
                title: 'Yaklaşım',
                items: [
                  'Dinamik psikoterapi',
                  'Aktarım odaklı terapi',
                  'Gelişimsel psikoterapi',
                ],
              },
              {
                icon: 'groups',
                title: 'Çalıştığım Gruplar',
                items: ['Yetişkinler', 'Çiftler', 'Bireysel ve grup seansları'],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow"
              >
                <span className="material-symbols-outlined text-3xl text-ocean-muted block mb-4">
                  {card.icon}
                </span>
                <h3 className="font-headline text-headline-md text-primary mb-4">{card.title}</h3>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-body-md text-on-surface-variant"
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
        </div>
      </section>

      <ContactSection />
    </>
  )
}
