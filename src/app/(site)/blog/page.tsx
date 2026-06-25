import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPublishedPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Psikolojik Danışman Öznur Yomralı blog yazıları. Terapi, psikoloji ve kişisel farkındalık üzerine makaleler.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-warm-sand/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">Yazılar</span>
          <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mt-4 mb-6">Blog</h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Psikoloji, terapi ve kişisel farkındalık üzerine yazılar.
          </p>
        </div>
      </div>

      <section className="py-section-gap-mobile md:py-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-outline-variant block mb-4">article</span>
              <p className="font-body text-body-lg text-on-surface-variant">Henüz yayınlanmış bir yazı yok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-surface rounded-xl border border-warm-sand soft-card-shadow hover-card-lift group block overflow-hidden"
                >
                  {post.cover_image ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-soft-mist flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-outline-variant">article</span>
                    </div>
                  )}
                  <div className="p-6">
                    <p className="font-caption text-caption text-on-surface-variant mb-3">
                      {new Date(post.created_at).toLocaleDateString('tr-TR', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </p>
                    <h2 className="font-headline text-headline-md text-primary mb-3 group-hover:text-ocean-muted transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-body text-body-md text-on-surface-variant line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center gap-2 font-label text-label-md text-ocean-muted">
                      Devamını oku
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
