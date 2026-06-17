'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  id: string
  label: string
  href: string
}

interface Props {
  navItems: NavItem[]
}

export default function NavbarClient({ navItems }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-surface/80 backdrop-blur-md shadow-sm ${
        scrolled ? 'h-16' : 'h-20'
      }`}
    >
      <div className="flex justify-between items-center h-full px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <Link
          href="/"
          className="font-headline text-headline-md font-semibold text-primary hover:opacity-80 transition-opacity"
        >
          Öznur Yomralı
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`font-label text-label-md transition-colors ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label text-label-md hover:opacity-80 transition-opacity"
          >
            Randevu Al
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menüyü aç/kapat"
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant">
          <div className="px-margin-mobile py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`block font-label text-label-md py-3 px-4 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'text-primary bg-primary/5'
                    : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <a
                href="https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-primary text-on-primary px-6 py-3 rounded-full font-label text-label-md text-center hover:opacity-80 transition-opacity"
              >
                Randevu Al
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
