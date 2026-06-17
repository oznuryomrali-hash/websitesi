import type { Metadata } from 'next'
import { Manrope, Open_Sans } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://oznuryomrali.com'),
  title: {
    default: 'Psikolojik Danışman Öznur Yomralı',
    template: '%s | Psikolojik Danışman Öznur Yomralı',
  },
  description:
    "Rize ve Trabzon'da yüz yüze, tüm Türkiye'de online bireysel terapi ve çift terapisi hizmetleri. Psikolojik Danışman Öznur Yomralı.",
  keywords: [
    'psikolojik danışman',
    'terapi',
    'Rize',
    'Trabzon',
    'online terapi',
    'bireysel terapi',
    'çift terapisi',
    'Öznur Yomralı',
  ],
  authors: [{ name: 'Öznur Yomralı' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Psikolojik Danışman Öznur Yomralı',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body
        className={`${manrope.variable} ${openSans.variable} bg-background text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed`}
      >
        {children}
      </body>
    </html>
  )
}
