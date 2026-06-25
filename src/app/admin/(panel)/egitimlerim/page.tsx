'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface Training {
  id: string
  title: string
  duration: string
  icon: string
  order: number
  is_active: boolean
}

const iconOptions = [
  'psychology', 'school', 'connect_without_contact', 'timeline',
  'palette', 'toys', 'family_restroom', 'favorite', 'visibility',
  'self_improvement', 'healing', 'sentiment_calm', 'menu_book',
]

const emptyForm = { title: '', duration: '', icon: 'school' }

export default function EgitimlerimAdminPage() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function fetchTrainings() {
    const { data } = await supabase.from('trainings').select('*').order('order')
    setTrainings(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchTrainings() }, [])

  function openNew() {
    setEditId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(t: Training) {
    setEditId(t.id)
    setForm({ title: t.title, duration: t.duration || '', icon: t.icon || 'school' })
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await supabase.from('trainings').update(form).eq('id', editId)
    } else {
      const maxOrder = trainings.reduce((m, t) => Math.max(m, t.order), -1)
      await supabase.from('trainings').insert({ ...form, order: maxOrder + 1, is_active: true })
    }
    await fetchTrainings()
    setShowForm(false)
    setEditId(null)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu eğitimi silmek istiyor musunuz?')) return
    await supabase.from('trainings').delete().eq('id', id)
    fetchTrainings()
  }

  async function handleToggle(t: Training) {
    await supabase.from('trainings').update({ is_active: !t.is_active }).eq('id', t.id)
    fetchTrainings()
  }

  async function moveUp(index: number) {
    if (index === 0) return
    const a = trainings[index]; const b = trainings[index - 1]
    await Promise.all([
      supabase.from('trainings').update({ order: b.order }).eq('id', a.id),
      supabase.from('trainings').update({ order: a.order }).eq('id', b.id),
    ])
    fetchTrainings()
  }

  async function moveDown(index: number) {
    if (index === trainings.length - 1) return
    const a = trainings[index]; const b = trainings[index + 1]
    await Promise.all([
      supabase.from('trainings').update({ order: b.order }).eq('id', a.id),
      supabase.from('trainings').update({ order: a.order }).eq('id', b.id),
    ])
    fetchTrainings()
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md'

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="font-body text-body-md text-on-surface-variant">Yükleniyor...</p>
    </div>
  )

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-headline-lg text-primary">Eğitimlerim</h1>
          <p className="font-body text-body-md text-on-surface-variant mt-1">
            Eğitim listesini yönetin. Sıralayın, ekleyin veya kaldırın.
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-surface rounded-xl border border-outline-variant p-6 soft-card-shadow">
          <h2 className="font-headline text-headline-md text-primary mb-5">
            {editId ? 'Eğitimi Düzenle' : 'Yeni Eğitim'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Eğitim Adı *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={inputClass}
                placeholder="Dinamik Bütüncül Terapi"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-label-md text-on-surface-variant mb-2">Süre (opsiyonel)</label>
                <input
                  value={form.duration}
                  onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                  className={inputClass}
                  placeholder="288 saat"
                />
              </div>
              <div>
                <label className="block font-label text-label-md text-on-surface-variant mb-2">İkon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className={inputClass}
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label text-label-md hover:opacity-80 disabled:opacity-50 transition-opacity">
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null) }}
                className="px-6 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-label text-label-md hover:bg-surface-container transition-colors">
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        {trainings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-body text-body-md text-on-surface-variant">
              Henüz eğitim yok. SQL dosyasını çalıştırdıysanız sayfayı yenileyin.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-outline-variant/30">
            {trainings.map((t, index) => (
              <li key={t.id} className={`flex items-center gap-3 px-5 py-4 hover:bg-surface-container-low/50 transition-colors ${!t.is_active ? 'opacity-50' : ''}`}>
                <div className="flex gap-0.5">
                  <button onClick={() => moveUp(index)} disabled={index === 0}
                    className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">arrow_upward</span>
                  </button>
                  <button onClick={() => moveDown(index)} disabled={index === trainings.length - 1}
                    className="p-1 rounded hover:bg-surface-container disabled:opacity-20 transition-colors text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">arrow_downward</span>
                  </button>
                </div>

                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">{t.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-body text-body-md text-on-surface font-medium">{t.title}</p>
                  {t.duration && (
                    <p className="font-caption text-caption text-on-surface-variant">{t.duration}</p>
                  )}
                </div>

                <button onClick={() => handleToggle(t)}
                  className={`px-3 py-1 rounded-full font-caption text-caption transition-colors ${t.is_active ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                  {t.is_active ? 'Aktif' : 'Gizli'}
                </button>

                <button onClick={() => openEdit(t)}
                  className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-base">edit</span>
                </button>

                <button onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
