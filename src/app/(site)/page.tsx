import type { Metadata } from 'next'
import Hero from '@/components/site/Hero'
import AboutSection from '@/components/site/AboutSection'
import QuoteSection from '@/components/site/QuoteSection'
import BlogSlider from '@/components/site/BlogSlider'
import ContactSection from '@/components/site/ContactSection'
import JsonLd from '@/components/seo/JsonLd'
import { getSiteContent } from '@/lib/content'
import { getPublishedPosts } from '@/lib/blog'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oznuryomrali.com'

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Öznur Yomralı',
      jobTitle: 'Psikolojik Danışman',
      url: siteUrl,
      sameAs: ['https://instagram.com/psikolojikdanisman.oznur'],
    },
    {
      '@type': ['ProfessionalService', 'Psychologist'],
      name: 'Psikolojik Danışman Öznur Yomralı',
      url: siteUrl,
      telephone: '+905343500675',
      areaServed: [
        { '@type': 'City', name: 'Rize' },
        { '@type': 'City', name: 'Trabzon' },
      ],
      availableChannel: {
        '@type': 'ServiceChannel',
        name: 'Online Terapi',
        serviceUrl: `${siteUrl}/online-terapi`,
      },
      sameAs: ['https://instagram.com/psikolojikdanisman.oznur'],
    },
  ],
}

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const defaultSectionOrder = ['hero', 'hakkimda', 'quote', 'blog', 'iletisim']

export default async function HomePage() {
  const content = await getSiteContent()
  const posts = await getPublishedPosts()

  let sectionOrder = defaultSectionOrder

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createClient } = await import('@/lib/supabase-server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('homepage_sections')
        .select('id')
        .eq('is_visible', true)
        .order('order')
      if (data && data.length > 0) {
        sectionOrder = data.map((s: { id: string }) => s.id)
      }
    }
  } catch {
    // Supabase erişimi yoksa varsayılan sıra kullanılır
  }

  function renderSection(id: string) {
    switch (id) {
      case 'hero': return <Hero key="hero" content={content} />
      case 'hakkimda': return <AboutSection key="hakkimda" content={content} />
      case 'quote': return <QuoteSection key="quote" content={content} />
      case 'blog': return <BlogSlider key="blog" posts={posts} />
      case 'iletisim': return <ContactSection key="iletisim" content={content} />
      default: return null
    }
  }

  return (
    <>
      <JsonLd data={schema} />
      {sectionOrder.map((id) => renderSection(id))}
    </>
  )
}
