'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  id: string
  label: string
  href: string
  parent_id?: string | null
  children?: NavItem[]
}

interface Props {
  navItems: NavItem[]
}

function useHashScroll() {
  const pathname = usePathname()

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('/#')) return
    const id = href.slice(2)
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { handleClick }
}

function NavLink({
  item,
  onClose,
  className,
}: {
  item: NavItem
  onClose: () => void
  className: string
}) {
  const { handleClick } = useHashScroll()
  return (
    <Link
      href={item.href}
      onClick={(e) => { handleClick(e, item.href); onClose() }}
      className={className}
    >
      {item.label}
    </Link>
  )
}

function DropdownItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { handleClick } = useHashScroll()
  const hasChildren = item.children && item.children.length > 0

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  if (!hasChildren) {
    return (
      <NavLink
        item={item}
        onClose={onClose}
        className={`font-label text-label-md transition-colors ${
          pathname === item.href ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
        }`}
      />
    )
  }

  const isActive = pathname.startsWith(item.href) && item.href !== '/'

  return (
    <div ref={ref} className="relative flex items-center gap-0.5">
      <Link
        href={item.href}
        onClick={(e) => { handleClick(e, item.href); onClose() }}
        className={`font-label text-label-md transition-colors ${
          isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        {item.label}
      </Link>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Alt menüyü aç"
        className="text-on-surface-variant hover:text-primary transition-colors"
      >
        <span
          className={`material-symbols-outlined text-base transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          expand_more
        </span>
      </button>

      {/* Desktop dropdown */}
      <div
        className={`absolute top-full left-0 mt-3 w-56 bg-surface rounded-xl shadow-lg border border-outline-variant overflow-hidden transition-all duration-200 z-50 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {item.children!.map((child) => (
          <Link
            key={child.id}
            href={child.href}
            onClick={() => { setOpen(false); onClose() }}
            className="flex items-center gap-2 px-4 py-3 font-label text-label-md text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors border-b border-outline-variant/30 last:border-0"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function NavbarClient({ navItems }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const { handleClick } = useHashScroll()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileDropdowns({})
  }, [pathname])

  const topLevel = navItems.filter((i) => !i.parent_id)
  const withChildren: NavItem[] = topLevel.map((item) => ({
    ...item,
    children: navItems.filter((c) => c.parent_id === item.id),
  }))

  function toggleMobileDropdown(id: string) {
    setMobileDropdowns((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
          {withChildren.map((item) => (
            <DropdownItem key={item.id} item={item} onClose={() => {}} />
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
            {withChildren.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isOpen = mobileDropdowns[item.id]

              return (
                <div key={item.id}>
                  {hasChildren ? (
                    <>
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={(e) => { handleClick(e, item.href); setMobileOpen(false) }}
                          className="flex-1 font-label text-label-md py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => toggleMobileDropdown(item.id)}
                          className="p-3 text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span
                            className={`material-symbols-outlined text-base transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          >
                            expand_more
                          </span>
                        </button>
                      </div>
                      {isOpen && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-4">
                          {item.children!.map((child) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              className="block font-label text-label-md py-2 text-on-surface-variant hover:text-primary transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={(e) => { handleClick(e, item.href); setMobileOpen(false) }}
                      className={`block font-label text-label-md py-3 px-4 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'text-primary bg-primary/5'
                          : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
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
