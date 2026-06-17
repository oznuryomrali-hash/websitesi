import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/types'

async function getLatestPosts(): Promise<Post[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return []
    }
    const { createClient } = await import('@/lib/supabase-server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, created_at, published, content, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)

    return data || []
  } catch {
    return []
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPreview() {
  const posts = await getLatestPosts()

  if (posts.length === 0) return null

  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
              Yazılar
            </span>
            <h2 className="font-headline text-headline-lg text-primary mt-4">Blog</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-label text-label-md text-ocean-muted hover:text-primary transition-colors"
          >
            Tüm yazılar
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-surface rounded-xl border border-warm-sand soft-card-shadow hover-card-lift group block overflow-hidden"
            >
              {post.cover_image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="font-caption text-caption text-on-surface-variant mb-3">
                  {formatDate(post.created_at)}
                </p>
                <h3 className="font-headline text-headline-md text-primary mb-3 group-hover:text-ocean-muted transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="font-body text-body-md text-on-surface-variant line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
