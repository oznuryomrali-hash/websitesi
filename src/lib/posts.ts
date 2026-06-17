import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDir = path.join(process.cwd(), 'src/content/posts')

export interface FilePost {
  slug: string
  title: string
  excerpt: string
  cover_image: string
  date: string
  published: boolean
  content: string
  id: string
  created_at: string
  updated_at: string
}

function readPost(filename: string): FilePost | null {
  try {
    const filePath = path.join(postsDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    if (!data.published) return null
    const slug = filename.replace(/\.md$/, '')
    return {
      id: slug,
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      cover_image: data.cover_image || '',
      date: data.date || '',
      published: data.published ?? true,
      content: marked(content) as string,
      created_at: data.date || new Date().toISOString(),
      updated_at: data.date || new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function getAllPosts(): FilePost[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  return files
    .map(readPost)
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as FilePost[]
}

export function getPostBySlug(slug: string): FilePost | null {
  return readPost(`${slug}.md`)
}
