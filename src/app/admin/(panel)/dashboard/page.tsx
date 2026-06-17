'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface Stats {
  clients: number
  weekAppointments: number
  publishedPosts: number
}

function getWeekRange() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return {
    start: monday.toISOString().split('T')[0],
    end: sunday.toISOString().split('T')[0],
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ clients: 0, weekAppointments: 0, publishedPosts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()
      const { start, end } = getWeekRange()

      const [clientsRes, appointmentsRes, postsRes] = await Promise.all([
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase
          .from('appointments')
          .select('id', { count: 'exact', head: true })
          .gte('date', start)
          .lte('date', end),
        supabase.from('posts').select('id', { count: 'exact', head: true }).eq('published', true),
      ])

      setStats({
        clients: clientsRes.count || 0,
        weekAppointments: appointmentsRes.count || 0,
        publishedPosts: postsRes.count || 0,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const cards = [
    { icon: 'group', label: 'Toplam Danışan', value: stats.clients, href: '/admin/danisanlar' },
    {
      icon: 'calendar_month',
      label: 'Bu Hafta Randevusu',
      value: stats.weekAppointments,
      href: '/admin/randevular',
    },
    {
      icon: 'article',
      label: 'Yayınlı Blog Yazısı',
      value: stats.publishedPosts,
      href: '/admin/blog',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-headline-lg text-primary">Özet</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">
          Hoş geldiniz, Öznur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-surface rounded-xl p-6 border border-outline-variant soft-card-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <p className="font-label text-label-md text-on-surface-variant">{card.label}</p>
            </div>
            {loading ? (
              <div className="h-8 bg-surface-container-high rounded animate-pulse" />
            ) : (
              <p className="font-headline text-display-lg text-primary">{card.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-xl p-6 border border-outline-variant">
        <h2 className="font-headline text-headline-md text-primary mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Yeni Danışan Ekle', href: '/admin/danisanlar', icon: 'person_add' },
            { label: 'Randevu Planla', href: '/admin/randevular', icon: 'event_add' },
            { label: 'Blog Yazısı Yaz', href: '/admin/blog', icon: 'edit_note' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-4 bg-soft-mist rounded-lg hover:bg-primary/5 border border-outline-variant transition-colors"
            >
              <span className="material-symbols-outlined text-primary">{item.icon}</span>
              <span className="font-label text-label-md text-on-surface">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
