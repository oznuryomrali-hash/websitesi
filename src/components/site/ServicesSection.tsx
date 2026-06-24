import Link from 'next/link'

const services = [
  {
    icon: 'person',
    title: 'Bireysel Terapi',
    description:
      'Kendinizle daha derin bir bağ kurmak, tekrar eden döngüleri anlamak ve yaşamınızda daha fazla farkındalık kazanmak için birebir destek.',
    items: ['Yetişkin ve ergenlerle çalışma', 'İlişki örüntülerine odaklı yaklaşım'],
    href: '/calisma-alanlari/bireysel-terapi',
  },
  {
    icon: 'favorite',
    title: 'Çift Terapisi',
    description:
      'İlişkide yaşanan güçlükleri, iletişim sorunlarını ve tekrar eden çatışma örüntülerini birlikte keşfetmek için çift terapisi.',
    items: ['İletişim ve sınır çalışması', 'İlişki örüntülerini anlama'],
    href: '/calisma-alanlari/cift-terapisi',
  },
  {
    icon: 'video_call',
    title: 'Online Terapi',
    description:
      'Türkiye ve dünyanın farklı ülkelerinde yaşayan Türkçe konuşan yetişkin ve çiftlerle güvenli online seans imkanı.',
    items: ['Türkiye ve yurt dışına hizmet', 'Güvenli ve esnek seans ortamı'],
    href: '/online-terapi',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop" id="hizmetler">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
              Hizmetler
            </span>
            <h2 className="font-headline text-headline-lg text-primary mt-4">Çalışma Alanlarım</h2>
            <p className="font-body text-body-md text-on-surface-variant mt-4">
              Her seans, kendinize doğru atılan bir adımdır. Size ve ilişkilerinize özel destek
              sunuyorum.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Yetişkin', 'Çocuk / Ergen', 'Çift', 'Online'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 rounded-full bg-secondary-container/30 text-secondary font-label text-label-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow hover-card-lift group block"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <h3 className="font-headline text-headline-md text-primary mb-4">{service.title}</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 font-body text-body-md text-on-surface-variant"
                  >
                    <span
                      className="material-symbols-outlined text-ocean-muted text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/calisma-alanlari"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 rounded-full font-label text-label-md hover:bg-primary hover:text-on-primary transition-all duration-300"
          >
            Tüm çalışma alanlarını gör
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
