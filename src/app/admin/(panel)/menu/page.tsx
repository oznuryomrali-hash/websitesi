'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { MenuItem } from '@/lib/types'

const emptyForm = { label: '', href: '', is_active: true, parent_id: '' }

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function fetchItems() {
    const { data } = await supabase.from('menu_items').select('*').order('order')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const topLevel = items.filter((i) => !i.parent_id)
    const maxOrder = topLevel.reduce((max, i) => Math.max(max, i.order), 0)
    await supabase.from('menu_items').insert({
      label: form.label,
      href: form.href || '#',
      is_active: form.is_active,
      parent_id: form.parent_id || null,
      order: maxOrder + 1,
    })
    await fetchItems()
    setShowForm(false)
    setForm(emptyForm)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu menü öğesini ve varsa alt öğelerini silmek istediğinize emin misiniz?')) return
    await supabase.from('menu_items').delete().eq('id', id)
    fetchItems()
  }

  async function handleToggle(item: MenuItem) {
    await supabase.from('menu_items').update({ is_active: !item.is_active }).eq('id', item.id)
    fetchItems()
  }

  async function moveUp(index: number, siblings: MenuItem[]) {
    if (index === 0) return
    const a = siblings[index]
    const b = siblings[index - 1]
    await Promise.all([
      supabase.from('menu_items').update({ order: b.order }).eq('id', a.id),
      supabase.from('menu_items').update({ order: a.order }).eq('id', b.id),
    ])
    fetchItems()
  }

  async function moveDown(index: number, siblings: MenuItem[]) {
    if (index === siblings.length - 1) return
    const a = siblings[index]
    const b = siblings[index + 1]
    await Promise.all([
      supabase.from('menu_items').update({ order: b.order }).eq('id', a.id),
      supabase.from('menu_items').update({ order: a.order }).eq('id', b.id),
    ])
    fetchItems()
  }

  const topLevel = items.filter((i) => !i.parent_id)
  const getChildren = (parentId: string) => items.filter((i) => i.parent_id === parentId)

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-headline-lg text-primary">Menü Yönetimi</h1>
        <button onClick={() => { setForm(emptyForm); setShowForm(true) }} className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-base">add</span>
          Öğe Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-surface rounded-xl border border-outline-variant p-6 soft-card-shadow">
          <h2 className="font-headline text-headline-md text-primary mb-6">Yeni Menü Öğesi</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-label-md text-on-surface-variant mb-2">Etiket *</label>
                <input required value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className={inputClass} placeholder="Hakkımda" />
              </div>
              <div>
                <label className="block font-label text-label-md text-on-surface-variant mb-2">Bağlantı</label>
                <input value={form.href} onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))} className={inputClass} placeholder="/hakkimda (alt başlık ise boş bırak)" />
              </div>
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Üst Başlık (opsiyonel)</label>
              <select value={form.parent_id} onChange={(e) => setForm((f) => ({ ...f, parent_id: e.target.value }))} className={inputClass}>
                <option value="">-- Üst başlık yok (ana menü öğesi) --</option>
                {topLevel.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label text-label-md hover:opacity-80 disabled:opacity-50 transition-opacity">
                {saving ? 'Ekleniyor...' : 'Ekle'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-label text-label-md hover:bg-surface-container transition-colors">
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-body text-body-md text-on-surface-variant">Yükleniyor...</div>
        ) : topLevel.length === 0 ? (
          <div className="p-8 text-center font-body text-body-md text-on-surface-variant">Henüz menü öğesi yok.</div>
        ) : (
          <div className="divide-y divide-outline-variant/30">
            {topLevel.map((item, index) => {
              const children = getChildren(item.id)
              return (
                <div key={item.id}>
                  {/* Ana öğe */}
                  <div className="flex items-center gap-3 px-6 py-4 hover:bg-surface-container-low/50 transition-colors">
                    <div className="flex gap-1">
                      <button onClick={() => moveUp(index, topLevel)} disabled={index === 0} className="p-1 rounded hover:bg-surface-container disabled:opacity-30 transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined text-base">arrow_upward</span>
                      </button>
                      <button onClick={() => moveDown(index, topLevel)} disabled={index === topLevel.length - 1} className="p-1 rounded hover:bg-surface-container disabled:opacity-30 transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined text-base">arrow_downward</span>
                      </button>
                    </div>
                    <div className="flex-1">
                      <span className="font-body text-body-md text-on-surface font-medium">{item.label}</span>
                      <span className="font-caption text-caption text-on-surface-variant ml-3">{item.href}</span>
                      {children.length > 0 && (
                        <span className="ml-2 font-caption text-caption text-ocean-muted bg-secondary-container/30 px-2 py-0.5 rounded-full">
                          {children.length} alt başlık
                        </span>
                      )}
                    </div>
                    <button onClick={() => handleToggle(item)} className={`px-3 py-1 rounded-full font-caption text-caption transition-colors ${item.is_active ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                      {item.is_active ? 'Aktif' : 'Gizli'}
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>

                  {/* Alt başlıklar */}
                  {children.map((child, ci) => (
                    <div key={child.id} className="flex items-center gap-3 px-6 py-3 bg-surface-container-low/30 border-t border-outline-variant/20 hover:bg-surface-container-low/60 transition-colors">
                      <div className="w-6 flex-shrink-0" />
                      <div className="flex gap-1">
                        <button onClick={() => moveUp(ci, children)} disabled={ci === 0} className="p-1 rounded hover:bg-surface-container disabled:opacity-30 transition-colors text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        </button>
                        <button onClick={() => moveDown(ci, children)} disabled={ci === children.length - 1} className="p-1 rounded hover:bg-surface-container disabled:opacity-30 transition-colors text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">arrow_downward</span>
                        </button>
                      </div>
                      <span className="text-on-surface-variant/40 font-body text-body-md">↳</span>
                      <div className="flex-1">
                        <span className="font-body text-body-md text-on-surface-variant">{child.label}</span>
                        <span className="font-caption text-caption text-on-surface-variant/60 ml-3">{child.href}</span>
                      </div>
                      <button onClick={() => handleToggle(child)} className={`px-3 py-1 rounded-full font-caption text-caption transition-colors ${child.is_active ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                        {child.is_active ? 'Aktif' : 'Gizli'}
                      </button>
                      <button onClick={() => handleDelete(child.id)} className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
