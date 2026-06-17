# CLAUDE.md — Psikolojik Danışman Öznur Yomralı | Portföy & Admin Paneli

## Proje Özeti

Psikolojik Danışman Öznur Yomralı için Next.js ile yazılmış kişisel portföy sitesi. Ziyaretçiye yönelik tanıtım sayfaları + sadece danışmana özel admin paneli içerir. Backend olarak Supabase kullanılır. Sabit ofis yoktur; Rize ve Trabzon'da anlaşmalı ofislerde saatlik çalışma ve online danışmanlık modeli üzerine kuruludur. Bu yüzden yerel SEO, sabit adres yerine hizmet bölgesi (service-area) mantığıyla kurulur.

-----

## Marka Bilgileri (Sabit Değerler)

- **Ad Soyad:** Öznur Yomralı
- **Unvan:** Psikolojik Danışman (PDR mezunu; "Psikolog" unvanı kullanılmaz)
- **Telefon (WhatsApp):** +90 534 350 06 75 → wa.me formatı: `905343500675`
- **Instagram:** https://instagram.com/psikolojikdanisman.oznur
- **Hizmet bölgeleri:** Rize, Trabzon (anlaşmalı ofis, saatlik) + Online (tüm Türkiye)
- **Hizmetler:** Bireysel terapi, Çift terapisi (yetişkinler ve çiftler)
- **Yaklaşım/ekol:** Dinamik, aktarım odaklı ve gelişimsel psikoterapiler
- **E-posta:** [DOLDURULACAK]
- **Çalışma saatleri:** [DOLDURULACAK]
- **Domain:** [DOLDURULACAK] (kod içinde `NEXT_PUBLIC_SITE_URL` üzerinden okunur)

-----

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **Backend/DB:** Supabase (auth + database + storage)
- **Deploy:** Vercel
- **Paket yöneticisi:** npm

-----

## Klasör Yapısı

> Önemli düzeltme: Admin sayfaları gerçek `/admin/...` klasöründe tutulur. Parantezli route group (`(admin)`) URL'e segment eklemediği için kullanılmaz; aksi halde `/admin/login` yerine `/login` oluşur ve middleware ile robots.txt bozulur. Public sayfalar `(site)` group'unda tutulabilir çünkü onların URL'inde ek segment istemiyoruz.

```
/app
  /(site)                      → Public sayfalar (URL'e segment eklemez)
    /page.tsx                  → Ana sayfa
    /hakkimda/page.tsx
    /hizmetler/page.tsx
    /rize-psikolojik-danisman/page.tsx     → Rize konum sayfası
    /trabzon-psikolojik-danisman/page.tsx  → Trabzon konum sayfası
    /online-terapi/page.tsx                → Online hizmet sayfası
    /blog/page.tsx
    /blog/[slug]/page.tsx
    /iletisim/page.tsx
  /admin                       → Admin paneli (gerçek /admin segmenti, auth korumalı)
    /login/page.tsx
    /dashboard/page.tsx
    /blog/page.tsx
    /danisanlar/page.tsx
    /randevular/page.tsx
    /sablonlar/page.tsx
    /menu/page.tsx
  /sitemap.ts                  → Dinamik sitemap
  /robots.ts                   → robots.txt
  /layout.tsx                  → Root layout (global metadata + JSON-LD)
/components
  /site                        → Public bileşenler
  /admin                       → Admin bileşenler
  /ui                          → Paylaşılan UI bileşenleri
  /seo
    /JsonLd.tsx                → Schema.org JSON-LD enjeksiyonu
/lib
  /supabase.ts                 → Supabase client (browser)
  /supabase-server.ts          → Supabase client (server components)
  /phone.ts                    → WhatsApp telefon normalize fonksiyonu
  /types.ts                    → TypeScript tipleri
/middleware.ts                 → Auth koruması (matcher ile sadece /admin)
/next.config.js                → images.remotePatterns (Supabase Storage)
```

-----

## Supabase Kurulum Adımları

> Bu adımlar geliştirici tarafından manuel yapılır, Claude Code yapmaz.

1. supabase.com → New Project oluştur
2. Project URL ve anon key'i `.env.local`'a yapıştır
3. SQL Editor'da aşağıdaki tabloları, trigger'ları ve RLS politikalarını çalıştır
4. Storage → "blog-images" adında **public** bucket oluştur, ardından storage RLS politikalarını çalıştır
5. Authentication → Settings → Email Confirmation'ı **kapat** (tek kullanıcılı sistem, onay maili yok)
6. **Kayıt akışı (tek seferlik bootstrap):**
   - Site ilk yayına alındığında `/admin/login` sayfasındaki "Kayıt ol" sekmesi açıktır.
   - Öznur buraya bir kez girip kendi email + şifresiyle kayıt olur (email onayı kapalı olduğu için anında giriş yapar).
   - Kayıt tamamlandıktan sonra geliştirici "Kayıt ol" sekmesini koddan kaldırır (`SIGNUP_ENABLED = false`).
   - Geriye sadece "Giriş yap" ve "Şifremi unuttum" kalır.
   - Bu, herkesin kayıt olup admin paneline erişmesini engeller (güvenlik açığını kapatır).

-----

## Supabase Tabloları (SQL)

```sql
-- Navbar menü öğeleri
CREATE TABLE menu_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  href text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Blog yazıları
CREATE TABLE posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  cover_image text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Danışanlar
CREATE TABLE clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Randevular
CREATE TABLE appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  duration integer DEFAULT 50,
  notes text,
  status text NOT NULL DEFAULT 'bekliyor' CHECK (status IN ('bekliyor', 'onaylandi', 'iptal')),
  created_at timestamptz DEFAULT now()
);

-- WhatsApp mesaj şablonları
CREATE TABLE message_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- posts.updated_at otomatik güncelleme trigger'ı
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_set_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
```

-----

## Supabase RLS (Row Level Security)

> Düzeltme: `FOR ALL` politikalarında hem `USING` hem `WITH CHECK` yazılır; yoksa INSERT/UPDATE yazma kontrolü eksik kalır. `auth.role()` yerine `auth.uid() IS NOT NULL` kullanılır.

```sql
-- POSTS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public posts viewable"
  ON posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admin full access posts"
  ON posts FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- MENU_ITEMS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public active menu viewable"
  ON menu_items FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin full access menu"
  ON menu_items FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- CLIENTS (public erişim YOK)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access clients"
  ON clients FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- APPOINTMENTS (public erişim YOK)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access appointments"
  ON appointments FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- MESSAGE_TEMPLATES (public erişim YOK)
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access templates"
  ON message_templates FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
```

clients, appointments, message_templates tablolarında public politika tanımlanmadığı için anon kullanıcılar bu verilere erişemez (RLS açıkken politika yoksa erişim reddedilir).

-----

## Supabase Storage (Blog Görselleri)

> Blog görselleri linkle değil, bilgisayardan yüklenir. Vercel kalıcı dosya saklayamadığı (serverless, salt-okunur dosya sistemi) için görseller Supabase Storage'a yüklenir. Admin panelinde kullanıcı dosya seçer, sistem dosyayı `blog-images` bucket'ına yükler ve dönen public URL'i `posts.cover_image` alanına veya TipTap içeriğine yazar.

Bucket: `blog-images` (public).

```sql
-- Herkes blog görsellerini okuyabilir (public bucket)
CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Sadece authenticated kullanıcı yükler
CREATE POLICY "Auth upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

-- Sadece authenticated kullanıcı günceller
CREATE POLICY "Auth update blog images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

-- Sadece authenticated kullanıcı siler
CREATE POLICY "Auth delete blog images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);
```

Upload akışı (admin tarafında):
```ts
const filePath = `${Date.now()}-${file.name}`;
const { data, error } = await supabase.storage
  .from('blog-images')
  .upload(filePath, file, { cacheControl: '3600', upsert: false });

const { data: pub } = supabase.storage
  .from('blog-images')
  .getPublicUrl(filePath);
// pub.publicUrl -> cover_image alanına yazılır
```

`next.config.js` içinde Supabase storage domaini tanımlanmazsa `<Image>` çalışmaz:
```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '[PROJE-REF].supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};
```

-----

## Middleware (Auth Koruması)

`/middleware.ts` sadece `/admin` altındaki route'ları korur. `@supabase/ssr` ile cookie tabanlı session yönetimi kullanılır.

Mantık:
- `/admin/login` hariç `/admin/*` altına oturumsuz erişimde `/admin/login`'e yönlendir.
- Oturum varken `/admin/login`'e gidilirse `/admin/dashboard`'a yönlendir.

```ts
// Matcher şart: yoksa middleware tüm route'larda (static dahil) çalışır
export const config = {
  matcher: ['/admin/:path*'],
};
```

-----

## SEO ve Schema

### Genel Strateji (Adres Olmadan Yerel SEO)

Sabit ofis olmadığı için sahte adres kullanılmaz. Konumlandırma "hizmet bölgesi işletmesi" mantığındadır:
- Google İşletme Profili (GBP) **Service Area Business** olarak açılır: adres gizli, hizmet bölgeleri Rize ve Trabzon.
- Üç hedef sayfa içerikle ayrıştırılır: `/rize-psikolojik-danisman`, `/trabzon-psikolojik-danisman`, `/online-terapi`.
- Schema'da sokak adresi yerine `areaServed` (Rize, Trabzon) ve online hizmet kanalı belirtilir.
- NAP tutarlılığı ad + telefon üzerinden sağlanır (her yerde aynı isim ve numara).

### Metadata (Next.js Metadata API)

`app/layout.tsx` içinde root metadata:
- `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)`
- `title: { default: 'Psikolojik Danışman Öznur Yomralı', template: '%s | Psikolojik Danışman Öznur Yomralı' }`
- `description`, `openGraph`, `twitter`, `alternates.canonical`
- Türkçe `lang="tr"`

Her sayfa kendi `generateMetadata` veya statik `metadata` export'unu tanımlar. Konum sayfaları benzersiz başlık ve açıklama kullanır (örn. "Rize Psikolojik Danışman | Bireysel ve Çift Terapisi").

### JSON-LD Schema (`components/seo/JsonLd.tsx`)

Ana sayfada `@graph` ile Person + ProfessionalService/Psychologist:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Öznur Yomralı",
      "jobTitle": "Psikolojik Danışman",
      "url": "https://[DOMAIN]",
      "sameAs": ["https://instagram.com/psikolojikdanisman.oznur"]
    },
    {
      "@type": ["ProfessionalService", "Psychologist"],
      "name": "Psikolojik Danışman Öznur Yomralı",
      "url": "https://[DOMAIN]",
      "telephone": "+905343500675",
      "areaServed": [
        { "@type": "City", "name": "Rize" },
        { "@type": "City", "name": "Trabzon" }
      ],
      "availableChannel": {
        "@type": "ServiceChannel",
        "name": "Online Terapi",
        "serviceUrl": "https://[DOMAIN]/online-terapi"
      },
      "sameAs": ["https://instagram.com/psikolojikdanisman.oznur"]
    }
  ]
}
```

Diğer schema tipleri:
- Blog detay sayfası: `BlogPosting` (headline, datePublished, dateModified, author=Öznur Yomralı, image)
- İletişim/Hizmetler sayfalarında uygun yerde `FAQPage`
- Tüm iç sayfalarda `BreadcrumbList`

### sitemap.ts ve robots.ts

`app/sitemap.ts`: statik sayfalar + Supabase'den yayınlı blog yazıları (slug bazlı) dinamik eklenir.

`app/robots.ts`:
```ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

-----

## WhatsApp Telefon Normalize

> Danışan numarayı `0534...`, `+90 534...` veya `534...` gibi farklı formatlarda girebilir. wa.me linkinde çift prefix / bozuk link olmaması için numara tek noktada normalize edilir.

```ts
// lib/phone.ts
export function normalizePhoneForWa(raw: string): string {
  let n = (raw || '').replace(/\D/g, ''); // sadece rakam
  if (n.startsWith('0')) n = n.slice(1);   // baştaki 0
  if (n.startsWith('90')) n = n.slice(2);  // baştaki 90
  return '90' + n;                         // tek 90 ekle
}
```

Kullanım:
```ts
const url = `https://wa.me/${normalizePhoneForWa(client.phone)}?text=${encodeURIComponent(mesaj)}`;
```

-----

## Sayfalar (Public)

### Ana Sayfa (`/`)

- Hero: kısa tanıtım + WhatsApp / iletişim CTA
- Hizmetler özeti (bireysel terapi, çift terapisi)
- Yaklaşım bölümü (aşağıdaki "Yaklaşım" metni)
- Hizmet bölgeleri vurgusu: Rize, Trabzon ve online
- Son 3 blog yazısı (Supabase)
- İletişime çağrı

### Hakkımda (`/hakkimda`)

"Ben Kimim?" metni (aynen kullanılacak):

> 2014 yılında Psikolojik Danışmanlık ve Rehberlik lisans eğitimimi tamamladım. 2020'den beri psikoterapi alanında eğitimler almaktayım. Şu an klinik psikoloji yüksek lisansına devam etmekteyim.
>
> Dinamik, aktarım odaklı ve gelişimsel psikoterapiler üzerine çeşitli eğitimler aldım. Yetişkinler ve çiftlerle çalışıyor; bireysel terapi ve çift terapisi hizmeti sunuyorum.
>
> Çalışmalarımda yalnızca belirtilere değil, kişinin iç dünyasına, ilişki örüntülerine ve yaşam öyküsüne odaklanıyorum.

### Yaklaşım (Hakkımda içinde veya ayrı bölüm)

> Bazen yaşadığımız sorunların neden tekrar ettiğini bilmeden aynı döngülerin içinde kalabiliriz. İlişkilerde benzer güçlükleri yaşayabilir, kendimizi anlamakta zorlanabilir ya da hayatımızda değişmesini istediğimiz şeyleri değiştiremediğimizi hissedebiliriz.
>
> Terapi sürecinde amacım, görünmeyen örüntülerin görünür hale gelmesine yardımcı olmak ve kişinin kendisiyle, duygularıyla ve ilişkileriyle daha derin bir bağ kurabilmesini desteklemektir.
>
> Bu süreç, kişinin yaşamındaki seçimler üzerinde daha fazla farkındalık ve özgürlük kazanmasına alan açar.

### Hizmetler (`/hizmetler`)

- Bireysel terapi (yetişkinler)
- Çift terapisi
- Yaklaşım: dinamik, aktarım odaklı ve gelişimsel psikoterapiler
- Hizmet biçimi: Rize ve Trabzon'da yüz yüze (anlaşmalı ofis) + online

### Konum Sayfaları

- `/rize-psikolojik-danisman`: Rize'ye özel başlık, açıklama, içerik; "Rize psikolojik danışman / terapi" hedefli
- `/trabzon-psikolojik-danisman`: Trabzon'a özel aynı yapı
- `/online-terapi`: online danışmanlık hedefli, tüm Türkiye

Bu sayfalar birbirinin kopyası olmamalı; her şehir için özgün giriş paragrafları yazılır (duplicate content cezasından kaçınmak için).

### Blog (`/blog`, `/blog/[slug]`)

- Supabase'den yayınlı yazı listesi: başlık, özet, tarih, kapak görseli
- Detay sayfası slug bazlı, `BlogPosting` schema'lı

### İletişim (`/iletisim`)

- Bilgi amaçlı metin (Rize, Trabzon, online)
- WhatsApp yönlendirme butonu

-----

## Navbar

- Sticky
- Öğeler Supabase `menu_items` tablosundan (is_active=true, order'a göre)
- Admin panelinden eklenip çıkarılabilir, sıralanabilir
- Mobil: hamburger menü

-----

## WhatsApp Butonu

- Sağ alt köşede sabit (fixed), tüm sayfalarda görünür, yeşil ikon
- Yeni sekmede açılır:
  ```
  https://wa.me/905343500675?text=Merhaba%2C%20bilgi%20almak%20istiyorum.
  ```

-----

## Admin Paneli

### Login (`/admin/login`)

`SIGNUP_ENABLED` adında bir sabit ile kontrol edilir.

- **Giriş yap** — email + şifre (`auth.signInWithPassword()`)
- **Kayıt ol** — `SIGNUP_ENABLED === true` iken görünür (`auth.signUp()`). İlk kurulumdan sonra `false` yapılıp kaldırılır.
- **Şifremi unuttum** — email gir, reset maili (`auth.resetPasswordForEmail()`)

Giriş başarılıysa `/admin/dashboard`'a yönlendir.

### Dashboard (`/admin/dashboard`)

- Özet kartları: toplam danışan, bu haftaki randevular, yayınlı blog yazısı sayısı

### Blog Yönetimi (`/admin/blog`)

- Yazı listesi: başlık, durum, tarih
- Yeni / düzenle / sil
- Rich text editor: **TipTap** (App Router için client component; SSR hydration sorununu önlemek için `immediatelyRender: false`)
- Kapak görseli ve içerik görselleri bilgisayardan yüklenir → Supabase Storage `blog-images` → dönen URL kaydedilir
- Slug başlıktan otomatik (Türkçe karakter dönüşümü: ş→s, ı→i, ğ→g, ü→u, ö→o, ç→c)
- Yayınla / Taslak kaydet

### Danışan Yönetimi (`/admin/danisanlar`)

- Liste, manuel ekle (isim + telefon + not), düzenle, sil

### Randevu Yönetimi (`/admin/randevular`)

- Liste: danışan adı, tarih, saat, durum
- Yeni: danışan seç (dropdown), tarih, saat, süre (dk), not
- Durum: Bekliyor / Onaylandı / İptal
- Randevu detayından WhatsApp şablonu seç → `normalizePhoneForWa` ile link üret → gönder

### WhatsApp Mesaj Şablonları (`/admin/sablonlar`)

- Liste, ekle/düzenle/sil
- Değişken desteği: `{isim}`, `{tarih}`, `{saat}` (gönderim anında danışan/randevu verisiyle doldurulur)
- Link: `https://wa.me/${normalizePhoneForWa(danisan_telefon)}?text=${encodeURIComponent(doldurulmus_sablon)}`

### Menü Yönetimi (`/admin/menu`)

- Listele, ekle (label + href), sil
- Sıralama: yukarı/aşağı buton (order güncellenir)

-----

## Önemli Kurallar

- Tüm metinler **Türkçe**
- Unvan her yerde **Psikolojik Danışman** (asla "Psikolog" değil)
- Admin paneli indexlenmez → `robots.ts` ile `/admin` disallow
- `.env.local` `.gitignore`'da, commit'lenmez
- `SUPABASE_SERVICE_ROLE_KEY` **yalnızca server tarafında** kullanılır, asla client'a gönderilmez (`NEXT_PUBLIC_` öneki almaz)
- Görseller Next.js `<Image>` ile, Supabase domaini `remotePatterns`'a eklenir
- Loading ve error state'leri her sayfada ele alınır
- Responsive zorunlu
- Supabase client: browser için `createBrowserClient`, server component için `createServerClient`
- Em dash (—) kullanılmaz; düz tire veya ayrı cümle tercih edilir

-----

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

-----

## Kurulum Komutları

```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint
npm install @supabase/supabase-js @supabase/ssr
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
```
