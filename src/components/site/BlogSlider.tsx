'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/types'

interface Props {
  posts: Post[]
}

export default function BlogSlider({ posts }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null)

  function slide(dir: 'left' | 'right') {
    if (!sliderRef.current) return
    const card = sliderRef.current.querySelector('.blog-card') as HTMLElement
    const width = card ? card.offsetWidth + 24 : 340
    sliderRef.current.scrollBy({ left: dir === 'right' ? width : -width, behavior: 'smooth' })
  }

  if (posts.length === 0) return null

  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Başlık */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-label text-label-md text-ocean-muted uppercase tracking-widest">
              Yazılar
            </span>
            <h2 className="font-headline text-headline-lg text-primary mt-2">Blog Yazılarım</h2>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => slide('left')}
              aria-label="Önceki"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-200"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button
              onClick={() => slide('right')}
              aria-label="Sonraki"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-200"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="blog-card snap-start flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-surface rounded-xl border border-warm-sand soft-card-shadow hover-card-lift group block overflow-hidden"
            >
              {post.cover_image ? (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-soft-mist flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-outline-variant">
                    article
                  </span>
                </div>
              )}
              <div className="p-6">
                <p className="font-caption text-caption text-on-surface-variant mb-2">
                  {new Date(post.created_at).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <h3 className="font-headline text-headline-md text-primary mb-3 group-hover:text-ocean-muted transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="font-body text-body-md text-on-surface-variant line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-1 font-label text-label-md text-ocean-muted">
                  Devamını oku
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tüm yazılar */}
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-label text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200"
          >
            Tüm Yazıları Gör
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
