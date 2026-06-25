'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface Category {
  id: string
  title: string
  slug: string
  icon: string
  description: string
  order: number
  is_active: boolean
}

interface Item {
  id: string
  category_id: string
  text: string
  order: number
}

const iconOptions = [
  { value: 'psychology', label: 'Psikoloji' },
  { value: 'female', label: 'Kadın' },
  { value: 'diversity_3', label: 'İlişkiler' },
  { value: 'monitor_heart', label: 'Kalp' },
  { value: 'psychiatry', label: 'Psikiyatri' },
  { value: 'person', label: 'Kişi' },
  { value: 'group', label: 'Grup' },
  { value: 'self_improvement', label: 'Meditasyon' },
  { value: 'sentiment_calm', label: 'Huzur' },
  { value: 'healing', label: 'İyileşme' },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/İ/g, 'i').replace(/Ş/g, 's')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function CalısmaAlanlariAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<Record<string, Item[]>>({})
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [newItemText, setNewItemText] = useState<Record<string, string>>({})
  const [addingItem, setAddingItem] = useState<Record<string, boolean>>({})

  // Category form
  const [showCatForm, setShowCatForm] = useState(false)
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [catForm, setCatForm] = useState({ title: '', slug: '', icon: 'psychology', description: '' })
  const [savingCat, setSavingCat] = useState(false)

  const supabase = createClient()

  async function fetchAll() {
    const { data: cats } = await supabase
      .from('working_area_categories')
      .select('*')
      .order('order')
    setCategories(cats || [])

    const { data: allItems } = await supabase
      .from('working_area_items')
      .select('*')
      .order('order')

    const grouped: Record<string, Item[]> = {}
    allItems?.forEach((item: Item) => {
      if (!grouped[item.category_id]) grouped[item.category_id] = []
      grouped[item.category_id].push(item)
    })
    setItems(grouped)
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  function openAddCat() {
    setEditingCat(null)
    setCatForm({ title: '', slug: '', icon: 'psychology', description: '' })
    setShowCatForm(true)
  }

  function openEditCat(cat: Category) {
    setEditingCat(cat)
    setCatForm({ title: cat.title, slug: cat.slug, icon: cat.icon, description: cat.description || '' })
    setShowCatForm(true)
  }

  async function saveCat(e: React.FormEvent) {
    e.preventDefault()
    setSavingCat(true)
    const payload = {
      title: catForm.title,
      slug: catForm.slug || slugify(catForm.title),
      icon: catForm.icon,
      description: catForm.description,
    }
    if (editingCat) {
      await supabase.from('working_area_categories').update(payload).eq('id', editingCat.id)
    } else {
      const maxOrder = categories.reduce((m, c) => Math.max(m, c.order), -1)
      await supabase.from('working_area_categories').insert({ ...payload, order: maxOrder + 1, is_active: true })
    }
    await fetchAll()
    setShowCatForm(false)
    setSavingCat(false)
  }

  async function deleteCat(id: string) {
    if (!confirm('Bu kategoriyi ve tüm maddelerini silmek istiyor musunuz?')) return
    await supabase.from('working_area_categories').delete().eq('id', id)
    fetchAll()
  }

  async function toggleCat(cat: Category) {
    await supabase.from('working_area_categories').update({ is_active: !cat.is_active }).eq('id', cat.id)
    fetchAll()
  }

  async function moveCatUp(index: number) {
    if (index === 0) return
    const a = categories[index]; const b = categories[index - 1]
    await Promise.all([
      supabase.from('working_area_categories').update({ order: b.order }).eq('id', a.id),
      supabase.from('working_area_categories').update({ order: a.order }).eq('id', b.id),
    ])
    fetchAll()
  }

  async function moveCatDown(index: number) {
    if (index === categories.length - 1) return
    const a = categories[index]; const b = categories[index + 1]
    await Promise.all([
      supabase.from('working_area_categories').update({ order: b.order }).eq('id', a.id),
      supabase.from('working_area_categories').update({ order: a.order }).eq('id', b.id),
    ])
    fetchAll()
  }

  async function addItem(catId: string) {
    const text = (newItemText[catId] || '').trim()
    if (!text) return
    setAddingItem((s) => ({ ...s, [catId]: true }))
    const catItems = items[catId] || []
    const maxOrder = catItems.reduce((m, i) => Math.max(m, i.order), -1)
    await supabase.from('working_area_items').insert({ category_id: catId, text, order: maxOrder + 1 })
    setNewItemText((s) => ({ ...s, [catId]: '' }))
    await fetchAll()
    setAddingItem((s) => ({ ...s, [catId]: false }))
  }

  async function deleteItem(itemId: string) {
    await supabase.from('working_area_items').delete().eq('id', itemId)
    fetchAll()
  }

  async function moveItemUp(catId: string, index: number) {
    const catItems = items[catId] || []
    if (index === 0) return
    const a = catItems[index]; const b = catItems[index - 1]
    await Promise.all([
      supabase.from('working_area_items').update({ order: b.order }).eq('id', a.id),
      supabase.from('working_area_items').update({ order: a.order }).eq('id', b.id),
    ])
    fetchAll()
  }

  async function moveItemDown(catId: string, index: number) {
    const catItems = items[catId] || []
    if (index === catItems.length - 1) return
    const a = catItems[index]; const b = catItems[index + 1]
    await Promise.all([
      supabase.from('working_area_items').update({ order: b.order }).eq('id', a.id),
      supabase.from('working_area_items').update({ order: a.order }).eq('id', b.id),
    ])
    fetchAll()
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md'

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="font-body text-body-md text-on-surface-variant">Yükleniyor...</p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-headline text-headline-lg text-primary">Çalışma Alanları</h1>
          <p className="font-body text-body-md text-on-surface-variant mt-1">
            Kategori ve konu maddelerini yönetin. Değişiklikler siteye anında yansır.
          </p>
        </div>
        <button
          onClick={openAddCat}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Yeni Kategori
        </button>
      </div>

      {/* Category form */}
      {showCatForm && (
        <div className="bg-surface rounded-xl border border-outline-variant p-6 soft-card-shadow">
          <h2 className="font-headline text-headline-md text-primary mb-5">
            {editingCat ? 'Kategori Düzenle' : 'Yeni Kategori'}
          </h2>
          <form onSubmit={saveCat} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-label-md text-on-surface-variant mb-2">Başlık *</label>
                <input
                  required
                  value={catForm.title}
                  onChange={(e) => setCatForm((f) => ({
                    ...f, title: e.target.value,
                    slug: f.slug || slugify(e.target.value)
                  }))}
                  className={inputClass}
                  placeholder="Kadın Ruh Sağlığı"
                />
              </div>
              <div>
                <label className="block font-label text-label-md text-on-surface-variant mb-2">URL Kısmı (slug)</label>
                <input
                  value={catForm.slug}
                  onChange={(e) => setCatForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                  className={inputClass}
                  placeholder="kadin-ruh-sagligi"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-label-md text-on-surface-variant mb-2">İkon</label>
                <select
                  value={catForm.icon}
                  onChange={(e) => setCatForm((f) => ({ ...f, icon: e.target.value }))}
                  className={inputClass}
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">{catForm.icon}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Kısa Açıklama</label>
              <textarea
                value={catForm.description}
                onChange={(e) => setCatForm((f) => ({ ...f, description: e.target.value }))}
                className={`${inputClass} h-20 resize-none`}
                placeholder="Kart üzerinde görünecek kısa açıklama"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={savingCat}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label text-label-md hover:opacity-80 disabled:opacity-50 transition-opacity"
              >
                {savingCat ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button
                type="button"
                onClick={() => setShowCatForm(false)}
                className="px-6 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-label text-label-md hover:bg-surface-container transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories list */}
      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="bg-surface rounded-xl border border-outline-variant p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-4">category</span>
            <p className="font-body text-body-md text-on-surface-variant">Henüz kategori yok.</p>
            <p className="font-caption text-caption text-on-surface-variant/60 mt-1">
              Supabase SQL dosyasını çalıştırdıysanız sayfayı yenileyin.
            </p>
          </div>
        ) : (
          categories.map((cat, index) => {
            const catItems = items[cat.id] || []
            const isExpanded = expandedId === cat.id
            return (
              <div
                key={cat.id}
                className={`bg-surface rounded-xl border overflow-hidden transition-all ${
                  cat.is_active ? 'border-outline-variant' : 'border-outline-variant/50 opacity-60'
                }`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <div className="flex gap-0.5">
                    <button onClick={() => moveCatUp(index)} disabled={index === 0}
                      className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">arrow_upward</span>
                    </button>
                    <button onClick={() => moveCatDown(index)} disabled={index === categories.length - 1}
                      className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">arrow_downward</span>
                    </button>
                  </div>

                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body text-body-md text-on-surface font-medium truncate">{cat.title}</p>
                    <p className="font-caption text-caption text-on-surface-variant/70">/calisma-alanlari/{cat.slug}</p>
                  </div>

                  <span className="font-caption text-caption text-on-surface-variant/60">
                    {catItems.length} madde
                  </span>

                  <button
                    onClick={() => toggleCat(cat)}
                    className={`px-3 py-1 rounded-full font-caption text-caption transition-colors ${
                      cat.is_active ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {cat.is_active ? 'Aktif' : 'Gizli'}
                  </button>

                  <button
                    onClick={() => openEditCat(cat)}
                    className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                    title="Düzenle"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>

                  <button
                    onClick={() => deleteCat(cat.id)}
                    className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors"
                    title="Sil"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                    className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                  >
                    <span className={`material-symbols-outlined text-base transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                </div>

                {/* Items (expanded) */}
                {isExpanded && (
                  <div className="border-t border-outline-variant/30 bg-surface-container-low/30">
                    {catItems.length === 0 ? (
                      <p className="px-8 py-4 font-body text-body-md text-on-surface-variant/60">
                        Henüz madde yok. Aşağıdan ekleyin.
                      </p>
                    ) : (
                      <ul className="divide-y divide-outline-variant/20">
                        {catItems.map((item, ii) => (
                          <li key={item.id} className="flex items-center gap-3 px-6 py-3 hover:bg-surface-container-low/50 transition-colors">
                            <div className="flex gap-0.5">
                              <button onClick={() => moveItemUp(cat.id, ii)} disabled={ii === 0}
                                className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant">
                                <span className="material-symbols-outlined text-xs">arrow_upward</span>
                              </button>
                              <button onClick={() => moveItemDown(cat.id, ii)} disabled={ii === catItems.length - 1}
                                className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant">
                                <span className="material-symbols-outlined text-xs">arrow_downward</span>
                              </button>
                            </div>
                            <span className="material-symbols-outlined text-sm text-ocean-muted flex-shrink-0"
                              style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            <span className="flex-1 font-body text-body-md text-on-surface-variant">{item.text}</span>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="p-1.5 rounded hover:bg-error-container/20 text-on-surface-variant/50 hover:text-error transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Add item */}
                    <div className="px-6 py-4 border-t border-outline-variant/30">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Yeni madde ekle..."
                          value={newItemText[cat.id] || ''}
                          onChange={(e) => setNewItemText((s) => ({ ...s, [cat.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(cat.id) } }}
                          className="flex-1 px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md"
                        />
                        <button
                          onClick={() => addItem(cat.id)}
                          disabled={addingItem[cat.id] || !(newItemText[cat.id] || '').trim()}
                          className="px-5 py-2.5 bg-primary text-on-primary rounded-lg font-label text-label-md hover:opacity-80 disabled:opacity-40 transition-opacity"
                        >
                          {addingItem[cat.id] ? 'Ekleniyor...' : 'Ekle'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
