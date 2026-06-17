import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import JsonLd from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oznuryomrali.com'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Öznur Yomralı', jobTitle: 'Psikolojik Danışman' },
    image: post.cover_image,
    url: `${siteUrl}/blog/${post.slug}`,
  }

  return (
    <>
      <JsonLd data={schema} />

      <div className="pt-28 pb-4 md:pt-36">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <Link href="/blog" className="inline-flex items-center gap-2 font-label text-label-md text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Blog'a dön
          </Link>
        </div>
      </div>

      <article className="pb-section-gap-mobile md:pb-section-gap-desktop">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="max-w-3xl mx-auto">
            <header className="mb-12">
              <p className="font-caption text-caption text-on-surface-variant mb-4">
                {new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} - Öznur Yomralı
              </p>
              <h1 className="font-headline text-headline-lg md:text-display-lg text-primary mb-6">{post.title}</h1>
              {post.excerpt && <p className="font-body text-body-lg text-on-surface-variant">{post.excerpt}</p>}
            </header>

            {post.cover_image && (
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-12">
                <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
              </div>
            )}

            <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: post.content }} />

            <footer className="mt-16 pt-8 border-t border-outline-variant">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="font-headline text-headline-md text-primary">Öznur Yomralı</p>
                  <p className="font-body text-body-md text-on-surface-variant">Psikolojik Danışman</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}
