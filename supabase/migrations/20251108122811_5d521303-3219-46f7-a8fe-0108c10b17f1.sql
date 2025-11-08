-- Drop exchanges table as it's not needed for direct messaging
DROP TABLE IF EXISTS exchanges;

-- Rename items table to talents
ALTER TABLE items RENAME TO talents;

-- Update talents table columns to be more appropriate for skills/talents
ALTER TABLE talents 
  DROP COLUMN IF EXISTS condition,
  DROP COLUMN IF EXISTS images;

-- Update RLS policies for talents table
DROP POLICY IF EXISTS "Herkes aktif eşyaları görebilir" ON talents;
DROP POLICY IF EXISTS "Kullanıcılar kendi eşyalarını yönetebilir" ON talents;

CREATE POLICY "Herkes aktif yetenekleri görebilir" 
  ON talents FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Kullanıcılar kendi yeteneklerini yönetebilir" 
  ON talents FOR ALL 
  USING (auth.uid() = user_id);