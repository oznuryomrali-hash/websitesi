import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Hakkımda',
  description:
    'Psikoterapist Öznur Yomralı hakkında bilgi edinin. PDR mezunu, klinik psikoloji yüksek lisans öğrencisi. Psikodinamik yaklaşım ile yetişkinler ve çiftlerle çalışıyor.',
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
            Bireylerin ve çiftlerin iç dünyalarını keşfetmelerine, kendilerini ve ilişkilerini daha
            derinden anlamalarına ve daha doyumlu bir yaşam içinde dönüşüm süreçlerine eşlik
            ediyorum.
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
                Mesleki yolculuğum boyunca insanın ruhsal dünyasını daha derinlemesine anlayabilmek
                amacıyla psikoterapi alanında çeşitli eğitimler aldım ve almaya devam ediyorum.
                Halen Klinik Psikoloji Yüksek Lisans eğitimimi sürdürmekteyim.
              </p>
              <p className="font-body text-body-lg text-on-surface-variant">
                Dinamik, aktarım odaklı ve gelişimsel psikoterapi yaklaşımları üzerine eğitimler
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

          {/* Kart grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Eğitim */}
            <Link
              href="/egitimlerim"
              className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow hover-card-lift group block"
            >
              <span className="material-symbols-outlined text-3xl text-ocean-muted block mb-4 group-hover:text-primary transition-colors">
                school
              </span>
              <h3 className="font-headline text-headline-md text-primary mb-4 group-hover:text-ocean-muted transition-colors">
                Eğitim
              </h3>
              <ul className="space-y-2 mb-4">
                {[
                  'PDR Lisans (2014)',
                  'Klinik Psikoloji Yüksek Lisans (devam)',
                  'Psikoterapi eğitimleri (2020-)',
                ].map((item) => (
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
              <span className="font-label text-label-md text-ocean-muted flex items-center gap-1">
                Tüm eğitimlerimi gör
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </Link>

            {/* Yaklaşım */}
            <div className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
              <span className="material-symbols-outlined text-3xl text-ocean-muted block mb-4">
                psychology
              </span>
              <h3 className="font-headline text-headline-md text-primary mb-4">Yaklaşım</h3>
              <ul className="space-y-2">
                {[
                  'Psikodinamik yaklaşım',
                  'İlişki örüntülerine odaklı çalışma',
                  'Derinlemesine keşif ve farkındalık',
                ].map((item) => (
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

            {/* Çalıştığım Gruplar */}
            <div className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
              <span className="material-symbols-outlined text-3xl text-ocean-muted block mb-4">
                groups
              </span>
              <h3 className="font-headline text-headline-md text-primary mb-4">
                Çalıştığım Gruplar
              </h3>
              <ul className="space-y-2">
                {['Yetişkin', 'Çocuk / Ergen', 'Çift', 'Online'].map((item) => (
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

            {/* Özellikle Çalıştığım Konular */}
            <Link
              href="/calisma-alanlari"
              className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow hover-card-lift group block"
            >
              <span className="material-symbols-outlined text-3xl text-ocean-muted block mb-4 group-hover:text-primary transition-colors">
                hub
              </span>
              <h3 className="font-headline text-headline-md text-primary mb-4 group-hover:text-ocean-muted transition-colors">
                Özellikle Çalıştığım Konular
              </h3>
              <ul className="space-y-2 mb-4">
                {[
                  'İlişki / çift sorunları',
                  'Annelik ve kadın ruh sağlığı',
                  'Vajinismus ve cinsel isteksizlik',
                  'Ölüm korkusu ve yoğun kaygı',
                  'Psikosomatik şikayetler',
                ].map((item) => (
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
              <span className="font-label text-label-md text-ocean-muted flex items-center gap-1">
                Tüm konuları gör
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
