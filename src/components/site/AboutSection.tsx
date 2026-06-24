import Link from 'next/link'
import type { SiteContent } from '@/lib/content'
import { c } from '@/lib/content'

interface Props {
  content?: SiteContent
}

export default function AboutSection({ content = {} }: Props) {
  const p1 = c(content, 'hakkimda_p1', '2014 yılında Psikolojik Danışmanlık ve Rehberlik lisans eğitimimi tamamladım. Mesleki yolculuğum boyunca insanın ruhsal dünyasını daha derinlemesine anlayabilmek amacıyla psikoterapi alanında çeşitli eğitimler aldım ve almaya devam ediyorum. Halen Klinik Psikoloji Yüksek Lisans eğitimimi sürdürmekteyim.')
  const p2 = c(content, 'hakkimda_p2', 'Dinamik, aktarım odaklı ve gelişimsel psikoterapi yaklaşımları üzerine eğitimler aldım. Yetişkinler ve çiftlerle çalışıyor; bireysel terapi ve çift terapisi hizmeti sunuyorum.')
  const p3 = c(content, 'hakkimda_p3', 'Çalışmalarımda yalnızca belirtilere değil, kişinin iç dünyasına, ilişki örüntülerine ve yaşam öyküsüne odaklanıyorum.')

  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-warm-sand/50" id="hakkimda">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Yaklaşımım
          </span>
          <h2 className="font-headline text-headline-lg text-primary mt-4">
            Size özel, insani bir terapi deneyimi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Ben Kimim */}
          <div className="md:col-span-8 bg-surface rounded-xl p-8 md:p-12 border border-warm-sand soft-card-shadow">
            <div className="space-y-4">
              <h3 className="font-headline text-headline-md text-primary">Ben Kimim?</h3>
              <p className="font-body text-body-md text-on-surface-variant">
                Bireylerin ve çiftlerin iç dünyalarını keşfetmelerine, kendilerini ve ilişkilerini daha derinden anlamalarına ve daha doyumlu bir yaşam içinde dönüşüm süreçlerine eşlik ediyorum.
              </p>
              <p className="font-body text-body-md text-on-surface-variant">{p1}</p>
              <p className="font-body text-body-md text-on-surface-variant">{p2}</p>
              <p className="font-body text-body-md text-on-surface-variant">{p3}</p>
            </div>
          </div>

          {/* Psikodinamik Yaklaşım */}
          <div className="md:col-span-4 bg-ocean-muted text-on-primary rounded-xl p-8 flex flex-col justify-between">
            <span className="material-symbols-outlined text-4xl">psychology</span>
            <div className="mt-8">
              <h3 className="font-headline text-headline-md mb-4">Yaklaşımım</h3>
              <ul className="space-y-3">
                {[
                  'Psikodinamik yaklaşım',
                  'İlişki örüntülerine odaklı çalışma',
                  'Derinlemesine keşif ve farkındalık',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-base mt-0.5 flex-shrink-0 opacity-90"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="font-body text-body-md opacity-95">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Güvenli Alan */}
          <div className="md:col-span-4 bg-soft-mist border border-outline-variant rounded-xl p-8 flex flex-col justify-between hover-card-lift">
            <span className="material-symbols-outlined text-3xl text-primary">shield</span>
            <div className="mt-6">
              <h3 className="font-headline text-headline-md text-primary mb-4">Güvenli Alan</h3>
              <p className="font-body text-body-md text-on-surface-variant">
                Yargılanmadan, saygıyla ve gizlilikle dinlendiğiniz bir terapi ortamı.
              </p>
            </div>
          </div>

          {/* Özellikle Çalıştığım Konular */}
          <div className="md:col-span-8 bg-surface border border-warm-sand rounded-xl p-8">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-ocean-muted mt-1 flex-shrink-0">hub</span>
              <div className="w-full">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="font-headline text-headline-md text-primary">Özellikle Çalıştığım Konular</h3>
                  <Link
                    href="/calisma-alanlari"
                    className="font-label text-label-md text-ocean-muted hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Tümünü gör
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
                <ul className="space-y-3">
                  {[
                    'İlişki / çift sorunları',
                    'Annelik ve kadın ruh sağlığı',
                    'Vajinismus ve kadınlarda cinsel isteksizlik',
                    'Ölüm korkusu ve yoğun kaygı',
                    'Psikosomatik şikayetler',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-body text-body-md text-on-surface-variant"
                    >
                      <span
                        className="material-symbols-outlined text-ocean-muted text-base flex-shrink-0"
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
        </div>
      </div>
    </section>
  )
}
