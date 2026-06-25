'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface Section {
  id: string
  label: string
  order: number
  is_visible: boolean
}

const fallbackSections: Section[] = [
  { id: 'hero', label: 'Hero / Karşılama', order: 0, is_visible: true },
  { id: 'hakkimda', label: 'Hakkımda', order: 1, is_visible: true },
  { id: 'quote', label: 'Alıntı Kutusu', order: 2, is_visible: true },
  { id: 'blog', label: 'Blog Yazıları', order: 3, is_visible: true },
  { id: 'iletisim', label: 'İletişim', order: 4, is_visible: true },
]

const sectionDescriptions: Record<string, string> = {
  hero: 'Anasayfanın en üstündeki karşılama bölümü, başlık ve WhatsApp butonu.',
  hakkimda: 'Ben kimim, yaklaşımım ve özellikle çalıştığım konular.',
  quote: 'Kısa ilham verici alıntı kutusu.',
  blog: 'Son blog yazılarının yatay kayan slider\'ı.',
  iletisim: 'WhatsApp yönlendirmesi ve iletişim bilgileri.',
}

export default function AnasayfaPage() {
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const supabase = createClient()

  async function fetchSections() {
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .order('order')
    if (error || !data || data.length === 0) {
      setSections(fallbackSections)
    } else {
      setSections(data)
    }
    setLoading(false)
  }

  useEffect(() => { fetchSections() }, [])

  async function toggleVisibility(section: Section) {
    setSaving((s) => ({ ...s, [section.id]: true }))
    await supabase
      .from('homepage_sections')
      .update({ is_visible: !section.is_visible })
      .eq('id', section.id)
    await fetchSections()
    setSaving((s) => ({ ...s, [section.id]: false }))
    setSaved((s) => ({ ...s, [section.id]: true }))
    setTimeout(() => setSaved((s) => ({ ...s, [section.id]: false })), 2000)
  }

  async function moveUp(index: number) {
    if (index === 0) return
    const a = sections[index]
    const b = sections[index - 1]
    await Promise.all([
      supabase.from('homepage_sections').update({ order: b.order }).eq('id', a.id),
      supabase.from('homepage_sections').update({ order: a.order }).eq('id', b.id),
    ])
    fetchSections()
  }

  async function moveDown(index: number) {
    if (index === sections.length - 1) return
    const a = sections[index]
    const b = sections[index + 1]
    await Promise.all([
      supabase.from('homepage_sections').update({ order: b.order }).eq('id', a.id),
      supabase.from('homepage_sections').update({ order: a.order }).eq('id', b.id),
    ])
    fetchSections()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-body text-body-md text-on-surface-variant">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-headline text-headline-lg text-primary">Anasayfa Bölümleri</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">
          Hangi bölümlerin görüneceğini ve sırasını buradan ayarlayın. Değişiklikler anında siteye yansır.
        </p>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        <div className="bg-surface-container-low px-6 py-3 border-b border-outline-variant grid grid-cols-12 gap-3">
          <span className="col-span-1 font-label text-label-sm text-on-surface-variant">Sıra</span>
          <span className="col-span-7 font-label text-label-sm text-on-surface-variant">Bölüm</span>
          <span className="col-span-4 font-label text-label-sm text-on-surface-variant text-right">Görünürlük</span>
        </div>

        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`grid grid-cols-12 gap-3 items-center px-6 py-4 border-b border-outline-variant/30 last:border-0 transition-colors ${
              section.is_visible ? 'hover:bg-surface-container-low/50' : 'opacity-50 bg-surface-container-low/20'
            }`}
          >
            {/* Sıralama butonları */}
            <div className="col-span-1 flex flex-col gap-0.5">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant"
                title="Yukarı taşı"
              >
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === sections.length - 1}
                className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant"
                title="Aşağı taşı"
              >
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </button>
            </div>

            {/* Bölüm bilgisi */}
            <div className="col-span-7">
              <p className="font-body text-body-md text-on-surface font-medium">{section.label}</p>
              <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                {sectionDescriptions[section.id] || ''}
              </p>
            </div>

            {/* Toggle */}
            <div className="col-span-4 flex items-center justify-end gap-3">
              {saved[section.id] && (
                <span className="font-caption text-caption text-ocean-muted">Kaydedildi</span>
              )}
              <button
                onClick={() => toggleVisibility(section)}
                disabled={saving[section.id]}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
                  section.is_visible ? 'bg-primary' : 'bg-outline-variant'
                }`}
                title={section.is_visible ? 'Gizle' : 'Göster'}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    section.is_visible ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-caption text-caption w-10 ${section.is_visible ? 'text-primary' : 'text-on-surface-variant'}`}>
                {section.is_visible ? 'Açık' : 'Gizli'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-xl border border-primary/20 p-5">
        <p className="font-body text-body-md text-primary/80">
          <span className="material-symbols-outlined text-base align-text-bottom mr-1">info</span>
          Bölümlerin metnini düzenlemek için{' '}
          <a href="/admin/icerik" className="underline font-medium">İçerik</a>{' '}
          sayfasını kullanın.
        </p>
      </div>
    </div>
  )
}
