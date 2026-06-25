import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Çalışma Alanlarım',
  description:
    'Psikolojik Danışman Öznur Yomralı çalışma alanları: Bireysel terapi, çift terapisi, kadın ruh sağlığı, ilişkiler, psikosomatik zorluklar ve daha fazlası.',
  alternates: { canonical: '/calisma-alanlari' },
}

const services = [
  {
    icon: 'person',
    title: 'Bireysel Terapi',
    description:
      'Kendinizle daha derin bir bağ kurmak, tekrar eden döngüleri anlamak ve daha özgür bir yaşam için birebir destek.',
    tags: ['Yetişkin', 'Ergen'],
    href: '/calisma-alanlari/bireysel-terapi',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: 'favorite',
    title: 'Çift Terapisi',
    description:
      'İlişkideki güçlükleri, iletişim sorunlarını ve tekrar eden çatışma örüntülerini birlikte keşfetmek için çift terapisi.',
    tags: ['Çiftler', 'Evli / Bekar'],
    href: '/calisma-alanlari/cift-terapisi',
    color: 'bg-ocean-muted/10 text-ocean-muted',
  },
  {
    icon: 'video_call',
    title: 'Online Terapi',
    description:
      'Türkiye ve dünyanın farklı ülkelerinde yaşayan Türkçe konuşan yetişkin ve çiftlerle güvenli online seans.',
    tags: ['Türkiye', 'Yurt Dışı'],
    href: '/online-terapi',
    color: 'bg-secondary-container/30 text-secondary',
  },
]

// Supabase bağlantı yoksa gösterilecek varsayılan kategoriler
const fallbackAreas = [
  {
    id: 'f1',
    icon: 'female',
    title: 'Kadın Ruh Sağlığı',
    description: 'Kadın kimliği, annelik, beden algısı, cinsellik ve kadına özgü psikolojik zorluklar.',
    slug: 'kadin-ruh-sagligi',
  },
  {
    id: 'f2',
    icon: 'diversity_3',
    title: 'İlişkiler ve Çift Terapisi',
    description: 'Evlilik çatışmaları, iletişim sorunları, güven ve bağlanma sorunları, aldatma, boşanma.',
    slug: 'iliskiler-ve-cift',
  },
  {
    id: 'f3',
    icon: 'monitor_heart',
    title: 'Psikosomatik ve Duygusal Zorluklar',
    description: 'Bedensel belirtiler, kronik ağrılar, kaygı, panik atak, depresyon ve yas.',
    slug: 'psikosomatik',
  },
  {
    id: 'f4',
    icon: 'psychiatry',
    title: 'Derinlemesine Çalıştığım Temalar',
    description: 'Tekrarlayan örüntüler, terk edilme korkusu, sınır koyamama, kimlik ve varoluşsal kaygılar.',
    slug: 'derinlemesine-temalar',
  },
]

export default async function CalısmaAlanlariPage() {
  type Area = { id: string; icon: string; title: string; description: string | null; slug: string }
  let areas: Area[] = fallbackAreas

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createClient } = await import('@/lib/supabase-server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('working_area_categories')
        .select('id, title, slug, icon, description')
        .eq('is_active', true)
        .order('order')
      if (data && data.length > 0) {
        areas = data
      }
    }
  } catch {
    // Bağlantı hatasında varsayılanlar gösterilir
  }

  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Hizmetler
          </span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">
            Çalışma Alanlarım
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Yetişkinler, ergenler ve çiftlerle bireysel terapi ve çift terapisi alanında çalışıyorum.
            Aşağıda sunduğum hizmetleri ve özellikle odaklandığım konu başlıklarını bulabilirsiniz.
          </p>
        </div>
      </div>

      {/* Hizmetler */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="mb-12">
            <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
              Sunduğum Hizmetler
            </span>
            <h2 className="font-headline text-headline-lg text-primary mt-3">
              Nasıl Çalışıyorum?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow hover-card-lift group block"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${s.color}`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="font-headline text-headline-md text-primary mb-3">{s.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant mb-6">{s.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map((tag) => (
                    <span key={tag} className="px-3 py-0.5 rounded-full bg-warm-sand font-caption text-caption text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-label text-label-md text-ocean-muted flex items-center gap-1 group-hover:text-primary transition-colors">
                  Detaylı bilgi
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Çalışma Alanları (Supabase'den) */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="mb-12">
            <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
              Konu Başlıkları
            </span>
            <h2 className="font-headline text-headline-lg text-primary mt-3">
              Hangi Konularda Çalışıyorum?
            </h2>
            <p className="font-body text-body-md text-on-surface-variant mt-4 max-w-2xl">
              Her kategoride ayrıntılı bilgiye ulaşmak için ilgili kartı tıklayın.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area) => (
              <Link
                key={area.id}
                href={`/calisma-alanlari/${area.slug}`}
                className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow hover-card-lift group block"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined">{area.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline text-headline-md text-primary group-hover:text-ocean-muted transition-colors">
                      {area.title}
                    </h3>
                    {area.description && (
                      <p className="font-body text-body-md text-on-surface-variant mt-1">{area.description}</p>
                    )}
                  </div>
                </div>
                <span className="font-label text-label-md text-ocean-muted flex items-center gap-1 group-hover:text-primary transition-colors">
                  Tüm konuları gör
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seans bilgisi */}
      <section className="py-12 md:py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'schedule', title: 'Seans Süresi', desc: 'Her seans yaklaşık 50 dakikadır.' },
              { icon: 'location_on', title: 'Hizmet Şekli', desc: "Rize ve Trabzon'da yüz yüze, Türkiye ve yurt dışına online." },
              { icon: 'calendar_month', title: 'Randevu', desc: 'WhatsApp üzerinden hızla randevu oluşturabilirsiniz.' },
            ].map((item) => (
              <div key={item.title} className="bg-soft-mist rounded-xl p-6 border border-outline-variant flex items-start gap-4">
                <span className="material-symbols-outlined text-3xl text-ocean-muted flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-headline text-headline-md text-primary mb-1">{item.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
