export interface SiteContent {
  [key: string]: string
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return {}
    }
    const { createClient } = await import('./supabase-server')
    const supabase = await createClient()
    const { data } = await supabase.from('site_content').select('key, value')
    if (!data) return {}
    return Object.fromEntries(data.map((row: { key: string; value: string }) => [row.key, row.value]))
  } catch {
    return {}
  }
}

export function c(content: SiteContent, key: string, fallback: string): string {
  return content[key] || fallback
}
