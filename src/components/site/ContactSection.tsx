import type { SiteContent } from '@/lib/content'
import { c } from '@/lib/content'

interface Props {
  content?: SiteContent
}

export default function ContactSection({ content = {} }: Props) {
  const baslik = c(content, 'iletisim_cta_baslik', 'İlk adımı atmaya hazır misiniz?')
  const metin = c(content, 'iletisim_cta_metin', 'Sormak istediğiniz sorular ya da bir seans planlamak için WhatsApp üzerinden ulaşabilirsiniz. Rize, Trabzon ve online seanslar için bilgi almak her zaman mümkün.')
  const whatsappUrl = 'https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum.'

  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop" id="iletisim">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-8">
            <h2 className="font-headline text-headline-lg text-on-primary">{baslik}</h2>
            <p className="font-body text-body-md text-on-primary/80">{metin}</p>
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-on-primary text-primary font-label text-label-md py-4 rounded-xl hover:bg-soft-mist transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp ile İletişime Geç
              </a>
              <p className="text-center font-caption text-caption text-on-primary/60">
                Rize - Trabzon - Online - Türkiye geneli
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-primary-container/30 h-64 md:h-auto flex items-center justify-center">
            <div className="text-center text-on-primary/20 p-8">
              <span className="material-symbols-outlined text-9xl block mb-4">spa</span>
              <p className="font-headline text-headline-md text-on-primary/40">Öznur Yomralı</p>
              <p className="font-body text-body-md text-on-primary/30 mt-2">Psikolojik Danışman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
