-- =========================================================
-- EĞİTİMLERİM + ALINTI YÖNETİMİ — Supabase SQL Editor'da çalıştır
-- =========================================================

-- 1. EĞİTİMLER TABLOSU
CREATE TABLE IF NOT EXISTS trainings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  duration text DEFAULT '',
  icon text DEFAULT 'school',
  "order" integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true
);

ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read trainings" ON trainings;
DROP POLICY IF EXISTS "Admin manage trainings" ON trainings;
CREATE POLICY "Public read trainings" ON trainings FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manage trainings" ON trainings FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- 2. MEVCUT EĞİTİM VERİLERİNİ AKTAR
INSERT INTO trainings (title, duration, icon, "order") VALUES
  ('Dinamik Bütüncül Terapi',             '288 saat', 'psychology',           0),
  ('Aktarım Odaklı Terapi',               '32 saat',  'connect_without_contact', 1),
  ('Psikoterapide Gelişimsel Yaklaşımlar','10 ay',    'timeline',             2),
  ('Klinik Uygulamada Sanat Terapisi',    '28 saat',  'palette',              3),
  ('Dışavurumcu Oyun Terapisi',           '28 saat',  'toys',                 4),
  ('Aile Danışmanlığı',                   '',         'family_restroom',      5),
  ('Dinamik Çift Terapisi Uygulama Kampı','4 gün',   'favorite',             6),
  ('EMDR',                                '',         'visibility',           7),
  ('EFT (Duygusal Odak Terapisi)',        '',         'self_improvement',     8)
ON CONFLICT DO NOTHING;

-- 3. ALINTI METİNLERİNİ site_content'e EKLE (admin icerik sayfasından düzenlenebilir)
INSERT INTO site_content (key, section, label, value, type) VALUES
  ('quote_alinti', 'alinti', 'Alıntı Metni',
   'Terapi sürecinde amacım, görünmeyen örüntülerin görünür hale gelmesine yardımcı olmak ve kişinin kendisiyle, duygularıyla ve ilişkileriyle daha derin bir bağ kurabilmesini desteklemektir.',
   'textarea'),
  ('quote_isim', 'alinti', 'Alıntı Altı İsim',
   'Öznur Yomralı, Psikolojik Danışman',
   'text')
ON CONFLICT (key) DO NOTHING;
