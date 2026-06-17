'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface ContentItem {
  key: string
  section: string
  label: string
  value: string
  type: string
}

const sectionLabels: Record<string, string> = {
  hero: 'Ana Sayfa Hero',
  iletisim: 'İletişim / CTA',
  hakkimda: 'Hakkımda',
  yaklasim: 'Yaklaşım',
  genel: 'Genel',
}

export default function IcerikPage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const supabase = createClient()

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('site_content').select('*').order('section').order('key')
      setItems(data || [])
      const vals: Record<string, string> = {}
      data?.forEach((item: ContentItem) => { vals[item.key] = item.value })
      setEditing(vals)
      setLoading(false)
    }
    fetch()
  }, [])

  async function handleSave(key: string) {
    setSaving((s) => ({ ...s, [key]: true }))
    await supabase.from('site_content').update({ value: editing[key] }).eq('key', key)
    setSaving((s) => ({ ...s, [key]: false }))
    setSaved((s) => ({ ...s, [key]: true }))
    setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000)
  }

  const sections = [...new Set(items.map((i) => i.section))]

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-soft-mist focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md resize-none'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-body text-body-md text-on-surface-variant">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-headline text-headline-lg text-primary">Site İçerikleri</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">
          Değişiklikler kaydedildikten sonra site otomatik olarak güncellenir.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section} className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
            <h2 className="font-headline text-headline-md text-primary">
              {sectionLabels[section] || section}
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {items
              .filter((i) => i.section === section)
              .map((item) => (
                <div key={item.key}>
                  <label className="block font-label text-label-md text-on-surface-variant mb-2">
                    {item.label}
                  </label>
                  {item.type === 'textarea' ? (
                    <textarea
                      value={editing[item.key] || ''}
                      onChange={(e) => setEditing((v) => ({ ...v, [item.key]: e.target.value }))}
                      className={`${inputClass} h-28`}
                      rows={4}
                    />
                  ) : (
                    <input
                      type="text"
                      value={editing[item.key] || ''}
                      onChange={(e) => setEditing((v) => ({ ...v, [item.key]: e.target.value }))}
                      className={inputClass}
                    />
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleSave(item.key)}
                      disabled={saving[item.key]}
                      className="px-5 py-2 bg-primary text-on-primary rounded-lg font-label text-label-md hover:opacity-80 disabled:opacity-50 transition-opacity text-sm"
                    >
                      {saving[item.key] ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                    {saved[item.key] && (
                      <span className="flex items-center gap-1 font-caption text-caption text-ocean-muted">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        Kaydedildi
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
