'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { normalizePhoneForWa } from '@/lib/phone'
import type { Appointment, Client, MessageTemplate } from '@/lib/types'

const emptyForm = { client_id: '', date: '', time: '', duration: 50, notes: '', status: 'bekliyor' as const }

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const statusLabels: Record<string, string> = { bekliyor: 'Bekliyor', onaylandi: 'Onaylandı', iptal: 'İptal' }
const statusColors: Record<string, string> = {
  bekliyor: 'bg-tertiary-fixed text-on-tertiary-fixed',
  onaylandi: 'bg-secondary-container text-on-secondary-container',
  iptal: 'bg-error-container text-on-error-container',
}

export default function RandevularPage() {
  const [appointments, setAppointments] = useState<(Appointment & { clients: Client })[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState('')
  const [waTarget, setWaTarget] = useState<Appointment & { clients: Client } | null>(null)
  const supabase = createClient()

  async function fetchAll() {
    const [appRes, clientRes, tmplRes] = await Promise.all([
      supabase.from('appointments').select('*, clients(*)').order('date', { ascending: false }).order('time', { ascending: true }),
      supabase.from('clients').select('*').order('name'),
      supabase.from('message_templates').select('*').order('title'),
    ])
    setAppointments(appRes.data as (Appointment & { clients: Client })[] || [])
    setClients(clientRes.data || [])
    setTemplates(tmplRes.data || [])
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('appointments').insert(form)
    await fetchAll()
    setShowForm(false)
    setSaving(false)
    setForm(emptyForm)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('appointments').update({ status }).eq('id', id)
    fetchAll()
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu randevuyu silmek istediğinize emin misiniz?')) return
    await supabase.from('appointments').delete().eq('id', id)
    fetchAll()
  }

  function buildWaUrl(appt: Appointment & { clients: Client }, templateBody: string): string {
    const filled = templateBody
      .replace('{isim}', appt.clients?.name || '')
      .replace('{tarih}', formatDate(appt.date))
      .replace('{saat}', appt.time.substring(0, 5))
    const phone = normalizePhoneForWa(appt.clients?.phone || '')
    return `https://wa.me/${phone}?text=${encodeURIComponent(filled)}`
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-headline-lg text-primary">Randevular</h1>
        <button onClick={() => { setForm(emptyForm); setShowForm(true) }} className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-base">event_add</span>
          Yeni Randevu
        </button>
      </div>

      {/* WhatsApp modal */}
      {waTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setWaTarget(null)}>
          <div className="bg-surface rounded-xl p-6 max-w-md w-full space-y-4 soft-card-shadow" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-headline text-headline-md text-primary">WhatsApp Mesajı Gönder</h3>
            <p className="font-body text-body-md text-on-surface-variant">Danışan: <strong>{waTarget.clients?.name}</strong></p>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Şablon seç</label>
              <select value={selectedTemplateId} onChange={(e) => setSelectedTemplateId(e.target.value)} className={inputClass}>
                <option value="">-- Şablon seç --</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            {selectedTemplateId && (
              <a
                href={buildWaUrl(waTarget, templates.find((t) => t.id === selectedTemplateId)?.body || '')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-lg font-label text-label-md hover:brightness-110 transition-all"
              >
                WhatsApp'ta Aç
              </a>
            )}
            <button onClick={() => setWaTarget(null)} className="w-full py-2 text-on-surface-variant font-label text-label-md hover:text-primary transition-colors">
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-surface rounded-xl border border-outline-variant p-6 soft-card-shadow">
          <h2 className="font-headline text-headline-md text-primary mb-6">Yeni Randevu</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Danışan *</label>
              <select required value={form.client_id} onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))} className={inputClass}>
                <option value="">-- Danışan seç --</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Tarih *</label>
              <input required type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Saat *</label>
              <input required type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Süre (dk)</label>
              <input type="number" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: +e.target.value }))} className={inputClass} min={10} max={180} />
            </div>
            <div>
              <label className="block font-label text-label-md text-on-surface-variant mb-2">Not</label>
              <input value={form.notes || ''} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className={inputClass} placeholder="İsteğe bağlı" />
            </div>
            <div className="md:col-span-2 flex gap-3">
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
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center font-body text-body-md text-on-surface-variant">Henüz randevu yok.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Danışan</th>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Tarih / Saat</th>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Durum</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-body text-body-md text-on-surface">{appt.clients?.name}</td>
                  <td className="px-6 py-4 font-body text-body-md text-on-surface-variant">
                    {formatDate(appt.date)} - {appt.time.substring(0, 5)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={appt.status}
                      onChange={(e) => updateStatus(appt.id, e.target.value)}
                      className={`px-3 py-1 rounded-full font-caption text-caption border-0 cursor-pointer ${statusColors[appt.status]}`}
                    >
                      {Object.entries(statusLabels).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => { setWaTarget(appt); setSelectedTemplateId('') }} className="p-2 rounded-lg hover:bg-[#25D366]/10 text-on-surface-variant hover:text-[#25D366] transition-colors" title="WhatsApp gönder">
                        <span className="material-symbols-outlined text-base">chat</span>
                      </button>
                      <button onClick={() => handleDelete(appt.id)} className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors">
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
