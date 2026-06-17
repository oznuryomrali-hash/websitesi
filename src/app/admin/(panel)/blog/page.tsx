'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase'
import type { Post } from '@/lib/types'

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false })

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const emptyForm = { title: '', slug: '', excerpt: '', content: '', cover_image: '', published: false }

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setView('form')
  }

  function openEdit(post: Post) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image: post.cover_image || '',
      published: post.published,
    })
    setEditId(post.id)
    setView('form')
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: editId ? f.slug : slugify(title) }))
  }

  async function handleSave(published: boolean) {
    setSaving(true)
    const payload = { ...form, published }
    if (editId) {
      await supabase.from('posts').update(payload).eq('id', editId)
    } else {
      await supabase.from('posts').insert(payload)
    }
    await fetchPosts()
    setView('list')
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const filePath = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('blog-images').upload(filePath, file, { cacheControl: '3600', upsert: false })
    if (!error) {
      const { data: pub } = supabase.storage.from('blog-images').getPublicUrl(filePath)
      setForm((f) => ({ ...f, cover_image: pub.publicUrl }))
    }
    setUploading(false)
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary font-body text-body-md'

  if (view === 'form') {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline text-headline-lg text-primary">
            {editId ? 'Yazıyı Düzenle' : 'Yeni Yazı'}
          </h1>
        </div>

        <div className="bg-surface rounded-xl border border-outline-variant p-6 space-y-6">
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-2">Başlık</label>
            <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} placeholder="Yazı başlığı" />
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-2">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} placeholder="url-slug" />
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-2">Özet</label>
            <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} className={`${inputClass} h-24 resize-none`} placeholder="Kısa özet" />
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-2">Kapak Görseli</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="cover-upload" />
            <label htmlFor="cover-upload" className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container transition-colors font-label text-label-md text-on-surface-variant">
              <span className="material-symbols-outlined text-base">upload</span>
              {uploading ? 'Yükleniyor...' : 'Görsel Seç'}
            </label>
            {form.cover_image && <p className="mt-2 font-caption text-caption text-ocean-muted truncate">{form.cover_image}</p>}
          </div>
          <div>
            <label className="block font-label text-label-md text-on-surface-variant mb-2">İçerik</label>
            <RichTextEditor content={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => handleSave(false)} disabled={saving} className="px-6 py-3 border border-primary text-primary rounded-lg font-label text-label-md hover:bg-primary/5 transition-colors disabled:opacity-50">
            Taslak Kaydet
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-label text-label-md hover:opacity-80 transition-opacity disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Yayınla'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-headline-lg text-primary">Blog Yazıları</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label text-label-md hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-base">add</span>
          Yeni Yazı
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-body text-body-md text-on-surface-variant">Yükleniyor...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center font-body text-body-md text-on-surface-variant">Henüz yazı yok.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Başlık</th>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Durum</th>
                <th className="text-left px-6 py-3 font-label text-label-md text-on-surface-variant">Tarih</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-body text-body-md text-on-surface">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full font-caption text-caption ${post.published ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                      {post.published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-caption text-caption text-on-surface-variant">{formatDate(post.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(post)} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors">
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
