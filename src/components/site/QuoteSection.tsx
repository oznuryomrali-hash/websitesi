import type { SiteContent } from '@/lib/content'
import { c } from '@/lib/content'

interface Props {
  content?: SiteContent
}

export default function QuoteSection({ content = {} }: Props) {
  const alinti = c(
    content,
    'quote_alinti',
    'Terapi sürecinde amacım, görünmeyen örüntülerin görünür hale gelmesine yardımcı olmak ve kişinin kendisiyle, duygularıyla ve ilişkileriyle daha derin bir bağ kurabilmesini desteklemektir.',
  )
  const isim = c(content, 'quote_isim', 'Öznur Yomralı, Psikolojik Danışman')

  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-warm-sand">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-gutter text-center">
        <span
          className="material-symbols-outlined text-ocean-muted text-5xl mb-8 block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          format_quote
        </span>
        <blockquote className="font-headline text-headline-lg md:text-display-lg text-primary leading-tight mb-8">
          &ldquo;{alinti}&rdquo;
        </blockquote>
        <cite className="font-label text-label-md text-ocean-muted not-italic block">
          - {isim}
        </cite>
      </div>
    </section>
  )
}
