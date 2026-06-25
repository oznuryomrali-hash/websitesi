'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

const themes = [
  {
    id: 'ocean',
    name: 'Okyanus',
    desc: 'Mevcut tema — sakin, deniz mavisi tonlar',
    primary: '#306369',
    accent: '#5A8C92',
    bg: '#F4F7F7',
    preview: ['bg-[#306369]', 'bg-[#5A8C92]', 'bg-[#F4F7F7]'],
  },
  {
    id: 'lavender',
    name: 'Lavanta',
    desc: 'Sıcak mor ve lila tonlar',
    primary: '#6B5B8A',
    accent: '#8B7CAA',
    bg: '#F5F3F8',
    preview: ['bg-[#6B5B8A]', 'bg-[#8B7CAA]', 'bg-[#F5F3F8]'],
  },
  {
    id: 'forest',
    name: 'Orman',
    desc: 'Derin yeşil, doğal ve sakinleştirici',
    primary: '#2D5A4E',
    accent: '#4A7C6E',
    bg: '#F3F7F5',
    preview: ['bg-[#2D5A4E]', 'bg-[#4A7C6E]', 'bg-[#F3F7F5]'],
  },
  {
    id: 'earth',
    name: 'Toprak',
    desc: 'Sıcak kahverengi ve toprak renkleri',
    primary: '#7C5C3E',
    accent: '#A67C52',
    bg: '#F9F6F2',
    preview: ['bg-[#7C5C3E]', 'bg-[#A67C52]', 'bg-[#F9F6F2]'],
  },
  {
    id: 'rose',
    name: 'Gül',
    desc: 'Zarif pembe ve gül tonları',
    primary: '#8A5168',
    accent: '#B07090',
    bg: '#F8F3F5',
    preview: ['bg-[#8A5168]', 'bg-[#B07090]', 'bg-[#F8F3F5]'],
  },
]

export default function TasarimPage() {
  const [currentTheme, setCurrentTheme] = useState('ocean')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTheme() {
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('key', 'theme')
        .single()
      if (data?.value) setCurrentTheme(data.value)
      setLoading(false)
    }
    fetchTheme()
  }, [])

  async function saveTheme(themeId: string) {
    setSaving(true)
    setCurrentTheme(themeId)
    const { data: exists } = await supabase
      .from('site_content')
      .select('key')
      .eq('key', 'theme')
      .single()

    if (exists) {
      await supabase.from('site_content').update({ value: themeId }).eq('key', 'theme')
    } else {
      await supabase.from('site_content').insert({
        key: 'theme', value: themeId, section: 'genel', label: 'Site Teması', type: 'text'
      })
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="font-body text-body-md text-on-surface-variant">Yükleniyor...</p>
    </div>
  )

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-headline text-headline-lg text-primary">Tasarım ve Tema</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">
          Sitenizin renk temasını seçin. Seçim kaydedildikten sonra site yeniden başlatıldığında yeni tema aktif olur.
        </p>
      </div>

      {saved && (
        <div className="bg-secondary-container/30 border border-secondary text-on-secondary-container rounded-xl px-5 py-3 flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="font-body text-body-md">Tema kaydedildi.</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const isSelected = currentTheme === theme.id
          return (
            <button
              key={theme.id}
              onClick={() => saveTheme(theme.id)}
              disabled={saving}
              className={`text-left p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant bg-surface hover:border-primary/40'
              }`}
            >
              {/* Color swatches */}
              <div className="flex gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: theme.primary }} />
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: theme.accent }} />
                <div className="w-10 h-10 rounded-lg border border-outline-variant" style={{ backgroundColor: theme.bg }} />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-headline text-headline-md text-on-surface">{theme.name}</p>
                  <p className="font-caption text-caption text-on-surface-variant mt-1">{theme.desc}</p>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant p-6">
        <h2 className="font-headline text-headline-md text-primary mb-3">
          <span className="material-symbols-outlined text-base align-bottom mr-1">info</span>
          Tema Nasıl Değişir?
        </h2>
        <div className="space-y-2 font-body text-body-md text-on-surface-variant">
          <p>1. Yukarıdan bir tema seçin — seçim otomatik kaydedilir.</p>
          <p>2. Tema değişikliği için sitenin yeniden deploy edilmesi gerekir (Vercel otomatik yapar).</p>
          <p>3. Yerel geliştirme sırasında geliştirici değişikliği uygular.</p>
        </div>
      </div>

      {/* Font section */}
      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
          <h2 className="font-headline text-headline-md text-primary">Tipografi</h2>
        </div>
        <div className="p-6">
          <p className="font-body text-body-md text-on-surface-variant mb-4">
            Sitede kullanılan yazı tipleri:
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-soft-mist rounded-lg">
              <div>
                <p className="font-label text-label-md text-on-surface-variant">Başlıklar</p>
                <p className="font-headline text-headline-md text-primary mt-1">Cormorant Garamond</p>
              </div>
              <span className="font-caption text-caption text-on-surface-variant/60 bg-surface px-3 py-1 rounded-full border border-outline-variant">
                Aktif
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-soft-mist rounded-lg">
              <div>
                <p className="font-label text-label-md text-on-surface-variant">Metin</p>
                <p className="font-body text-body-md text-primary mt-1">Manrope</p>
              </div>
              <span className="font-caption text-caption text-on-surface-variant/60 bg-surface px-3 py-1 rounded-full border border-outline-variant">
                Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
