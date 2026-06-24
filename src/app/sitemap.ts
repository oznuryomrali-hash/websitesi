import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oznuryomrali.com'

const staticPages = [
  { url: '/', priority: 1.0, changeFrequency: 'monthly' as const },
  { url: '/hakkimda', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/egitimlerim', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/bireysel-terapi', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/cift-terapisi', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/kadin-ruh-sagligi', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/iliskiler-ve-cift', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/psikosomatik', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/derinlemesine-temalar', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/rize-psikolojik-danisman', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/trabzon-psikolojik-danisman', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/online-terapi', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/iletisim', priority: 0.7, changeFrequency: 'yearly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { getAllPosts } = await import('@/lib/posts')
  const slugs = getAllPosts().map((p) => p.slug)

  const blogPages = slugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  return [
    ...staticPages.map((p) => ({ ...p, url: `${siteUrl}${p.url}` })),
    ...blogPages,
  ]
}
