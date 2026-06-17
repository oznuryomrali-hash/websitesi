import type { Metadata } from 'next'
import Hero from '@/components/site/Hero'
import AboutSection from '@/components/site/AboutSection'
import ServicesSection from '@/components/site/ServicesSection'
import LocationsSection from '@/components/site/LocationsSection'
import QuoteSection from '@/components/site/QuoteSection'
import BlogSlider from '@/components/site/BlogSlider'
import ContactSection from '@/components/site/ContactSection'
import JsonLd from '@/components/seo/JsonLd'
import { getSiteContent } from '@/lib/content'
import type { Post } from '@/lib/types'

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

async function getBlogPosts(): Promise<Post[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return []
    const { createClient } = await import('@/lib/supabase-server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(8)
    return data || []
  } catch {
    return []
  }
}

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [content, posts] = await Promise.all([getSiteContent(), getBlogPosts()])

  return (
    <>
      <JsonLd data={schema} />
      <Hero content={content} />
      <AboutSection content={content} />
      <ServicesSection />
      <LocationsSection />
      <QuoteSection />
      <BlogSlider posts={posts} />
      <ContactSection content={content} />
    </>
  )
}
