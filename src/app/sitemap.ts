import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oznuryomrali.com'

const staticPages = [
  { url: '/', priority: 1.0, changeFrequency: 'monthly' as const },
  { url: '/hakkimda', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/egitimlerim', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/bireysel-terapi', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/calisma-alanlari/cift-terapisi', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/rize-psikolojik-danisman', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/trabzon-psikolojik-danisman', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/online-terapi', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { getAllPosts } = await import('@/lib/posts')
  const blogPages = getAllPosts().map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  // Supabase'den aktif çalışma alanı sayfaları
  const workingAreaPages: MetadataRoute.Sitemap = []
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createClient } = await import('@/lib/supabase-server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('working_area_categories')
        .select('slug')
        .eq('is_active', true)
      data?.forEach((c: { slug: string }) => {
        workingAreaPages.push({
          url: `${siteUrl}/calisma-alanlari/${c.slug}`,
          priority: 0.8,
          changeFrequency: 'monthly',
        })
      })
    }
  } catch {
    // Supabase erişimi yoksa çalışma alanları sitemapa eklenmez
  }

  return [
    ...staticPages.map((p) => ({ ...p, url: `${siteUrl}${p.url}` })),
    ...workingAreaPages,
    ...blogPages,
  ]
}
