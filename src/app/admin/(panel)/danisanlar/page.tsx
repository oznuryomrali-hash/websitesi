'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { normalizePhoneForWa } from '@/lib/phone'
import type { Client } from '@/lib/types'

const emptyForm = { name: '', phone: '', notes: '' }

export default function DanisanlarPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  async function fetchClients() {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setClients(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchClients() }, [])

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(client: Client) {
    setForm({ name: client.name, phone: client.phone || '', notes: client.notes || '' })
    setEditId(client.id)
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await supabase.from('clients').update(form).eq('id', editId)
    } else {
      await supabase.from('clients').insert(form)
    }
    await fetchClients()
    setShowForm(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu danışanı silmek istediğinize emin misiniz?')) return
    await supabase.from('clients').delete().eq('id', id)
    fetchClients()
  }

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || '').includes(search)
  )

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-headline-lg text-primary">Danışanlar</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-base">person_add</span>
          Yeni Danışan
        </button>
      </div>

      {/* Arama */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="İsim veya telefon ara..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-surface rounded-xl border border-outline-variant p-6 soft-card-shadow">
          <h2 className="font-headline text-headline-md text-primary mb-6">
            {editId ? 'Danışanı Düzenle' : 'Yeni Danışan'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Ad Soyad *</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Ad Soyad" />
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Telefon</label>
              <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputClass} placeholder="05xx xxx xx xx" type="tel" />
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Notlar</label>
              <textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className={`${inputClass} h-24 resize-none`} placeholder="Danışana ait notlar" />
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

      {/* Liste */}
      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-body text-body-md text-on-surface-variant">Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center font-body text-body-md text-on-surface-variant">
            {search ? 'Sonuç bulunamadı.' : 'Henüz danışan yok.'}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Ad Soyad</th>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Telefon</th>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Not</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-body text-body-md text-on-surface">{client.name}</td>
                  <td className="px-6 py-4">
                    {client.phone ? (
                      <a
                        href={`https://wa.me/${normalizePhoneForWa(client.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-body-md text-ocean-muted hover:underline"
                      >
                        {client.phone}
                      </a>
                    ) : (
                      <span className="font-caption text-caption text-on-surface-variant">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-caption text-caption text-on-surface-variant max-w-xs truncate">
                    {client.notes || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(client)} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button onClick={() => handleDelete(client.id)} className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
