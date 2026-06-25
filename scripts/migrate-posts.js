/**
 * Mevcut markdown blog yazılarını Supabase posts tablosuna aktarır.
 * Bir kez çalıştır: node scripts/migrate-posts.js
 */

const fs = require('fs')
const path = require('path')

// .env.local dosyasını manuel oku
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('.env.local dosyası bulunamadı!')
    process.exit(1)
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim()
    }
  }
}

loadEnv()

const { createClient } = require('@supabase/supabase-js')
const matter = require('gray-matter')
const { marked } = require('marked')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function migrate() {
  const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts')

  if (!fs.existsSync(postsDir)) {
    console.error('src/content/posts klasörü bulunamadı!')
    process.exit(1)
  }

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  console.log(`${files.length} yazı bulundu. Aktarılıyor...\n`)

  let success = 0
  let skipped = 0

  for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    const { data, content } = matter(raw)
    const slug = file.replace(/\.md$/, '')

    // Zaten var mı kontrol et
    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existing) {
      console.log(`⏭  Atlandı (zaten var): ${data.title}`)
      skipped++
      continue
    }

    const post = {
      title: data.title || slug,
      slug,
      excerpt: data.excerpt || null,
      cover_image: data.cover_image || null,
      content: marked(content),
      published: data.published !== false,
      created_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('posts').insert(post)

    if (error) {
      console.error(`✗ Hata (${slug}): ${error.message}`)
    } else {
      console.log(`✓ ${data.title}`)
      success++
    }
  }

  console.log(`\n✅ Tamamlandı: ${success} yazı aktarıldı, ${skipped} atlandı.`)
}

migrate().catch(err => {
  console.error('Beklenmeyen hata:', err)
  process.exit(1)
})
