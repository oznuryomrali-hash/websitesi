import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContactSection from '@/components/site/ContactSection'

export const dynamic = 'force-dynamic'

interface Item {
  id: string
  text: string
  order: number
}

interface Category {
  id: string
  title: string
  slug: string
  icon: string
  description: string | null
  working_area_items: Item[]
}

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null
    const { createClient } = await import('@/lib/supabase-server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('working_area_categories')
      .select('id, title, slug, icon, description, working_area_items(id, text, order)')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    return data || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Çalışma Alanı' }
  return {
    title: category.title,
    description: category.description || `${category.title} konusunda psikoterapi desteği.`,
    alternates: { canonical: `/calisma-alanlari/${slug}` },
  }
}

export default async function WorkingAreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) notFound()

  const items = [...category.working_area_items].sort((a, b) => a.order - b.order)

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
            {category.title}
          </h1>
          {category.description && (
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Konu listesi */}
            <div className="bg-surface rounded-xl p-8 border border-warm-sand soft-card-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">{category.icon}</span>
              </div>
              <h2 className="font-headline text-headline-md text-primary mb-6">Çalışılan Konular</h2>
              {items.length > 0 ? (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start gap-3 font-body text-body-md text-on-surface-variant">
                      <span
                        className="material-symbols-outlined text-ocean-muted text-base mt-0.5 flex-shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-body text-body-md text-on-surface-variant">
                  Bu kategorideki konular yakında eklenecek.
                </p>
              )}
            </div>

            {/* Yardımcı kutu + CTA */}
            <div className="space-y-6">
              <div className="bg-soft-mist rounded-xl p-8 border border-outline-variant">
                <h2 className="font-headline text-headline-md text-primary mb-4">Bu Alanda Nasıl Çalışıyorum?</h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Çalışmalarımda yalnızca belirtilere değil, kişinin iç dünyasına, ilişki örüntülerine
                  ve yaşam öyküsüne odaklanıyorum. Görünmeyen örüntülerin görünür hale gelmesine
                  yardımcı olarak daha derin bir bağ kurmayı hedefliyorum.
                </p>
              </div>
              <div className="bg-ocean-muted text-on-primary rounded-xl p-8">
                <span className="material-symbols-outlined text-3xl block mb-4">shield</span>
                <h3 className="font-headline text-headline-md mb-2">Güvenli Alan</h3>
                <p className="font-body text-body-md opacity-90">
                  Yargılanmadan, dürüstçe konuşabileceğiniz bir terapi ortamı sunuyorum.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-label-md hover:opacity-80 transition-opacity"
                >
                  Seans Al
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
                <Link
                  href="/calisma-alanlari"
                  className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 rounded-full font-label text-label-md hover:bg-primary hover:text-on-primary transition-all"
                >
                  Diğer Konular
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
