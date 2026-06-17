'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { MessageTemplate } from '@/lib/types'

const emptyForm = { title: '', body: '' }

export default function SablonlarPage() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  async function fetchTemplates() {
    const { data } = await supabase.from('message_templates').select('*').order('title')
    setTemplates(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchTemplates() }, [])

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(t: MessageTemplate) {
    setForm({ title: t.title, body: t.body })
    setEditId(t.id)
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await supabase.from('message_templates').update(form).eq('id', editId)
    } else {
      await supabase.from('message_templates').insert(form)
    }
    await fetchTemplates()
    setShowForm(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu şablonu silmek istediğinize emin misiniz?')) return
    await supabase.from('message_templates').delete().eq('id', id)
    fetchTemplates()
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-headline-lg text-primary">WhatsApp Şablonları</h1>
          <p className="font-body text-body-md text-on-surface-variant mt-1">
            Değişkenler: <code className="bg-surface-container px-1 rounded font-body text-sm">{'{isim}'}</code>,{' '}
            <code className="bg-surface-container px-1 rounded font-body text-sm">{'{tarih}'}</code>,{' '}
            <code className="bg-surface-container px-1 rounded font-body text-sm">{'{saat}'}</code>
          </p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-base">add</span>
          Yeni Şablon
        </button>
      </div>

      {showForm && (
        <div className="bg-surface rounded-xl border border-outline-variant p-6 soft-card-shadow">
          <h2 className="font-headline text-headline-md text-primary mb-6">
            {editId ? 'Şablonu Düzenle' : 'Yeni Şablon'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Başlık *</label>
              <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputClass} placeholder="Şablon adı" />
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Mesaj İçeriği *</label>
              <textarea
                required
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                className={`${inputClass} h-36 resize-none`}
                placeholder="Merhaba {isim}, randevunuz {tarih} saat {saat} olarak planlanmıştır."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label text-label-md hover:opacity-80 disabled:opacity-50 transition-opacity">
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-label text-label-md hover:bg-surface-container transition-colors">
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 p-8 text-center font-body text-body-md text-on-surface-variant">Yükleniyor...</div>
        ) : templates.length === 0 ? (
          <div className="col-span-2 p-8 text-center font-body text-body-md text-on-surface-variant">Henüz şablon yok.</div>
        ) : (
          templates.map((t) => (
            <div key={t.id} className="bg-surface rounded-xl border border-outline-variant p-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-headline text-headline-md text-primary">{t.title}</h3>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(t)} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
              <p className="font-body text-body-md text-on-surface-variant bg-soft-mist rounded-lg p-4 whitespace-pre-wrap">
                {t.body}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
