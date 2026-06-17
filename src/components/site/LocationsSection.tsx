import Link from 'next/link'

const locations = [
  {
    city: 'Rize',
    icon: 'location_on',
    description:
      "Rize'de anlaşmalı ofis aracılığıyla yüz yüze seans imkanı. Rize merkezde hizmet veriyorum.",
    href: '/rize-psikolojik-danisman',
    label: 'Rize hakkında bilgi al',
  },
  {
    city: 'Trabzon',
    icon: 'location_on',
    description:
      "Trabzon'da anlaşmalı ofis aracılığıyla yüz yüze seans imkanı. Trabzon merkezde hizmet veriyorum.",
    href: '/trabzon-psikolojik-danisman',
    label: 'Trabzon hakkında bilgi al',
  },
  {
    city: 'Online',
    icon: 'laptop_mac',
    description:
      "Türkiye'nin her yerinden güvenli ve esnek online seans. Zaman ve mekan sınırı olmadan terapi.",
    href: '/online-terapi',
    label: 'Online terapi hakkında bilgi al',
  },
]

export default function LocationsSection() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-soft-mist">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
            Nerede Çalışıyorum
          </span>
          <h2 className="font-headline text-headline-lg text-primary mt-4">Hizmet Bölgeleri</h2>
          <p className="font-body text-body-md text-on-surface-variant mt-4 max-w-xl mx-auto">
            Rize ve Trabzon'da anlaşmalı ofislerimde yüz yüze, Türkiye'nin her yerinde online
            olarak hizmet veriyorum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow hover-card-lift group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                <span className="material-symbols-outlined">{loc.icon}</span>
              </div>
              <h3 className="font-headline text-headline-md text-primary mb-4">{loc.city}</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-6">
                {loc.description}
              </p>
              <Link
                href={loc.href}
                className="inline-flex items-center gap-2 font-label text-label-md text-ocean-muted hover:text-primary transition-colors"
              >
                {loc.label}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
