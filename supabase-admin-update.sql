-- =========================================================
-- ADMIN PANEL GENİŞLETME - Supabase SQL Editor'da çalıştır
-- =========================================================

-- 1. ANASAYFA BÖLÜMLERİ
CREATE TABLE IF NOT EXISTS homepage_sections (
  id text PRIMARY KEY,
  label text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true
);

INSERT INTO homepage_sections VALUES
  ('hero',    'Hero / Karşılama',  0, true),
  ('hakkimda','Hakkımda',          1, true),
  ('quote',   'Alıntı Kutusu',     2, true),
  ('blog',    'Blog Yazıları',     3, true),
  ('iletisim','İletişim',          4, true)
ON CONFLICT DO NOTHING;

ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read sections" ON homepage_sections;
DROP POLICY IF EXISTS "Admin manage sections" ON homepage_sections;
CREATE POLICY "Public read sections" ON homepage_sections FOR SELECT USING (true);
CREATE POLICY "Admin manage sections" ON homepage_sections FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);


-- 2. ÇALIŞMA ALANLARI KATEGORİLERİ
CREATE TABLE IF NOT EXISTS working_area_categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  icon text DEFAULT 'psychology',
  description text,
  "order" integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS working_area_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid REFERENCES working_area_categories(id) ON DELETE CASCADE,
  text text NOT NULL,
  "order" integer NOT NULL DEFAULT 0
);

ALTER TABLE working_area_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_area_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read wa categories" ON working_area_categories;
DROP POLICY IF EXISTS "Admin manage wa categories" ON working_area_categories;
CREATE POLICY "Public read wa categories" ON working_area_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manage wa categories" ON working_area_categories FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Public read wa items" ON working_area_items;
DROP POLICY IF EXISTS "Admin manage wa items" ON working_area_items;
CREATE POLICY "Public read wa items" ON working_area_items FOR SELECT USING (true);
CREATE POLICY "Admin manage wa items" ON working_area_items FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);


-- 3. KATEGORİ VERİLERİ (mevcut içerikleri Supabase'e aktar)
INSERT INTO working_area_categories (title, slug, icon, description, "order") VALUES
  ('Kadın Ruh Sağlığı', 'kadin-ruh-sagligi', 'female',
   'Kadın kimliği, annelik, beden algısı, cinsellik ve kadına özgü psikolojik zorluklar.', 0),
  ('İlişkiler ve Çift Terapisi', 'iliskiler-ve-cift', 'diversity_3',
   'Evlilik çatışmaları, iletişim sorunları, güven ve bağlanma sorunları, aldatma, boşanma.', 1),
  ('Psikosomatik ve Duygusal Zorluklar', 'psikosomatik', 'monitor_heart',
   'Bedensel belirtiler, kronik ağrılar, kaygı, panik atak, depresyon ve yas.', 2),
  ('Derinlemesine Çalıştığım Temalar', 'derinlemesine-temalar', 'psychiatry',
   'Tekrarlayan örüntüler, terk edilme korkusu, sınır koyamama, kimlik ve varoluşsal kaygılar.', 3)
ON CONFLICT (slug) DO NOTHING;

-- Kadın Ruh Sağlığı maddeleri
DO $$ DECLARE cid uuid; BEGIN
  SELECT id INTO cid FROM working_area_categories WHERE slug = 'kadin-ruh-sagligi';
  IF NOT EXISTS (SELECT 1 FROM working_area_items WHERE category_id = cid) THEN
    INSERT INTO working_area_items (category_id, text, "order") VALUES
      (cid,'Kadınlıkla ilgili içsel çatışmalar',0),
      (cid,'Beden algısında bozulma',1),
      (cid,'Tıbbi olarak açıklanamayan infertilite',2),
      (cid,'Tıbbi olarak açıklanamayan tekrarlayan düşükler',3),
      (cid,'Doğum sonrası depresyonu',4),
      (cid,'Kadın kimliğinde yaşanan zorluklar (cinsellik, regl, gebelik)',5),
      (cid,'Vajinismus (dinamik çalışma)',6),
      (cid,'Kadınlarda cinsel isteksizlik',7),
      (cid,'Kadınlarda utanç',8),
      (cid,'Annelik suçluluğu',9);
  END IF;
END $$;

-- İlişkiler ve Çift maddeleri
DO $$ DECLARE cid uuid; BEGIN
  SELECT id INTO cid FROM working_area_categories WHERE slug = 'iliskiler-ve-cift';
  IF NOT EXISTS (SELECT 1 FROM working_area_items WHERE category_id = cid) THEN
    INSERT INTO working_area_items (category_id, text, "order") VALUES
      (cid,'Evlilik çatışmaları',0),(cid,'Evlilikte yalnızlık hissi',1),
      (cid,'İletişim problemleri',2),(cid,'Güven ve bağlanma sorunları',3),
      (cid,'Aldatma',4),(cid,'Aldatılma',5),
      (cid,'Boşanma süreci',6),(cid,'Ebeveynlikte yaşanan zorluklar',7);
  END IF;
END $$;

-- Psikosomatik maddeleri
DO $$ DECLARE cid uuid; BEGIN
  SELECT id INTO cid FROM working_area_categories WHERE slug = 'psikosomatik';
  IF NOT EXISTS (SELECT 1 FROM working_area_items WHERE category_id = cid) THEN
    INSERT INTO working_area_items (category_id, text, "order") VALUES
      (cid,'Nedeni açıklanamayan bedensel ağrılar, belirtiler ve yakınmalar',0),
      (cid,'Kronik ağrılar',1),(cid,'Kaygı',2),(cid,'Panik atak',3),
      (cid,'Depresyon',4),(cid,'Yas süreçleri',5),(cid,'Kronik stres',6);
  END IF;
END $$;

-- Derinlemesine Temalar maddeleri
DO $$ DECLARE cid uuid; BEGIN
  SELECT id INTO cid FROM working_area_categories WHERE slug = 'derinlemesine-temalar';
  IF NOT EXISTS (SELECT 1 FROM working_area_items WHERE category_id = cid) THEN
    INSERT INTO working_area_items (category_id, text, "order") VALUES
      (cid,'Tekrarlayan ilişki örüntüleri',0),(cid,'Değersizlik / yetersizlik duyguları',1),
      (cid,'Terk edilme korkusu',2),(cid,'Yalnız kalma korkusu',3),
      (cid,'Sınır koyamama / hayır demede güçlük',4),(cid,'Bağımlılıklar',5),
      (cid,'Mükemmeliyetçilik',6),(cid,'Onay arayışı',7),(cid,'Suçluluk',8),
      (cid,'Takıntılar',9),(cid,'Özgüven sorunları',10),(cid,'Kimlik ve benlik gelişimi',11),
      (cid,'Görünür olma ve başarılı olma korkuları',12),
      (cid,'Yoğun kaygılı varoluşsal çatışmalar',13),(cid,'Ölüm ve yok olma korkuları',14),
      (cid,'Kontrolü kaybetme korkusu',15),
      (cid,'Delireceği ve kendine hakim olamayacağı düşünceleri',16),
      (cid,'Belirsizliğe tahammülsüzlük',17);
  END IF;
END $$;
