'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { FilePost } from '@/lib/posts'

interface Props {
  posts: FilePost[]
}

export default function BlogSlider({ posts }: Props) {
  if (posts.length === 0) return null

  // Duplicate for seamless infinite loop
  const track = [...posts, ...posts, ...posts]

  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
              Yazılar
            </span>
            <h2 className="font-headline text-headline-lg text-primary mt-2">Blog Yazılarım</h2>
          </div>
          <Link
            href="/blog"
            className="flex-shrink-0 inline-flex items-center gap-1 font-label text-label-md text-ocean-muted hover:text-primary transition-colors"
          >
            Tümünü gör
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper overflow-hidden">
        <div className="animate-marquee flex gap-6" style={{ width: 'max-content' }}>
          {track.map((post, i) => (
            <Link
              key={`${post.slug}-${i}`}
              href={`/blog/${post.slug}`}
              className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] bg-surface rounded-xl border border-warm-sand soft-card-shadow group block overflow-hidden"
            >
              {post.cover_image ? (
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-44 bg-soft-mist flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-outline-variant">article</span>
                </div>
              )}
              <div className="p-5">
                <p className="font-caption text-caption text-on-surface-variant mb-2">
                  {new Date(post.date || post.created_at).toLocaleDateString('tr-TR', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
                <h3 className="font-headline text-headline-md text-primary mb-2 group-hover:text-ocean-muted transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="font-body text-body-md text-on-surface-variant line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-label text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200"
        >
          Tüm Yazıları Gör
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}
