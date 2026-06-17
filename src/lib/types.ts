export interface MenuItem {
  id: string
  label: string
  href: string
  order: number
  is_active: boolean
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  name: string
  phone: string | null
  notes: string | null
  created_at: string
}

export interface Appointment {
  id: string
  client_id: string
  date: string
  time: string
  duration: number
  notes: string | null
  status: 'bekliyor' | 'onaylandi' | 'iptal'
  created_at: string
  clients?: Client
}

export interface MessageTemplate {
  id: string
  title: string
  body: string
  created_at: string
}
