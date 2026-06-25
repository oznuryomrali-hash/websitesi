-- =========================================================
-- SUPABASE STORAGE — Blog Görselleri Kurulumu
-- Supabase SQL Editor'da çalıştır
-- =========================================================
-- NOT: Bucket'ı önce Supabase Storage arayüzünden oluştur:
--   Storage → New bucket → Name: "blog-images" → Public: AÇIK → Save
-- Sonra aşağıdaki SQL'i çalıştır:

-- Önceki politikaları temizle (varsa)
DROP POLICY IF EXISTS "Public read blog images"    ON storage.objects;
DROP POLICY IF EXISTS "Auth upload blog images"    ON storage.objects;
DROP POLICY IF EXISTS "Auth update blog images"    ON storage.objects;
DROP POLICY IF EXISTS "Auth delete blog images"    ON storage.objects;

-- Herkes blog görsellerini okuyabilir
CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Sadece giriş yapmış kullanıcı yükleyebilir
CREATE POLICY "Auth upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

-- Sadece giriş yapmış kullanıcı güncelleyebilir
CREATE POLICY "Auth update blog images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

-- Sadece giriş yapmış kullanıcı silebilir
CREATE POLICY "Auth delete blog images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);
