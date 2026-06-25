export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  content: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const { createClient } = await import('./supabase-server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, content, published, created_at, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { createClient } = await import('./supabase-server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    return data || null
  } catch {
    return null
  }
}
