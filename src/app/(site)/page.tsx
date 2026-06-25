import type { Metadata } from 'next'
import Hero from '@/components/site/Hero'
import AboutSection from '@/components/site/AboutSection'
import QuoteSection from '@/components/site/QuoteSection'
import BlogSlider from '@/components/site/BlogSlider'
import ContactSection from '@/components/site/ContactSection'
import JsonLd from '@/components/seo/JsonLd'
import { getSiteContent } from '@/lib/content'
import { getAllPosts } from '@/lib/posts'

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

export default async function HomePage() {
  const content = await getSiteContent()
  const posts = getAllPosts()

  return (
    <>
      <JsonLd data={schema} />
      <Hero content={content} />
      <AboutSection content={content} />
      <QuoteSection />
      <BlogSlider posts={posts} />
      <ContactSection content={content} />
    </>
  )
}
