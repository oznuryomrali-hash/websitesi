export default function QuoteSection() {
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
          "Terapi sürecinde amacım, görünmeyen örüntülerin görünür hale gelmesine yardımcı olmak ve
          kişinin kendisiyle, duygularıyla ve ilişkileriyle daha derin bir bağ kurabilmesini
          desteklemektir."
        </blockquote>
        <cite className="font-label text-label-md text-ocean-muted not-italic block">
          - Öznur Yomralı, Psikolojik Danışman
        </cite>
      </div>
    </section>
  )
}
