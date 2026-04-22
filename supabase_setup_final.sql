-- ==========================================
-- HÔTEL VOILE - SUPABASE SETUP SCRIPT
-- Copiez-collez tout ce code dans l'éditeur SQL de Supabase
-- ==========================================

-- 1. Création des tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  room_type TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_number TEXT UNIQUE NOT NULL,
  room_type TEXT NOT NULL,
  floor INTEGER NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 1,
  amenities JSONB DEFAULT '[]'::jsonb,
  is_available BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category TEXT,
  is_available BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Activation du Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. Politiques de sécurité (Policies)

-- Profiles: Users can view their own profile, admins can view all
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Reservations: Users can view/create their own, admins can view/all
CREATE POLICY "Users can view own reservations" ON public.reservations
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create own reservations" ON public.reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reservations" ON public.reservations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reservations" ON public.reservations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all reservations" ON public.reservations
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete all reservations" ON public.reservations
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Rooms: Everyone can view, only admins can modify
CREATE POLICY "Everyone can view rooms" ON public.rooms
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert rooms" ON public.rooms
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update rooms" ON public.rooms
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete rooms" ON public.rooms
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Services: Everyone can view, only admins can modify
CREATE POLICY "Everyone can view services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Contact Messages: Users can create, admins can view/all
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages" ON public.contact_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update contact messages" ON public.contact_messages
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. Trigger pour créer automatiquement un profile lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Création de l'administrateur
-- Note: Cette commande crée l'utilisateur dans auth.users
-- Le mot de passe est haché automatiquement par Supabase
DO $$
DECLARE
  user_id UUID;
BEGIN
  -- Créer l'utilisateur admin
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'axel.longepierre1@gmail.com',
    crypt('admin301203', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Administrateur","role":"admin"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  INTO user_id
  RETURNING id;

  -- Créer le profil associé
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (user_id, 'axel.longepierre1@gmail.com', 'Administrateur', 'admin');

EXCEPTION
  WHEN unique_violation THEN
    RAISE NOTICE 'L utilisateur existe déjà, mise à jour du rôle...';
    UPDATE public.profiles
    SET role = 'admin'
    WHERE email = 'axel.longepierre1@gmail.com';
END $$;

-- 7. Insertion de données de démo (optionnel)
INSERT INTO public.rooms (room_number, room_type, floor, price_per_night, capacity, amenities, is_available, image_url) VALUES
  ('101', 'Standard', 1, 89.00, 2, '["WiFi", "TV", "Climatisation"]', true, '/rooms/standard.jpg'),
  ('102', 'Standard', 1, 89.00, 2, '["WiFi", "TV", "Climatisation"]', true, '/rooms/standard.jpg'),
  ('201', 'Deluxe', 2, 129.00, 2, '["WiFi", "TV", "Climatisation", "Mini-bar", "Vue mer"]', true, '/rooms/deluxe.jpg'),
  ('202', 'Deluxe', 2, 129.00, 2, '["WiFi", "TV", "Climatisation", "Mini-bar", "Vue mer"]', true, '/rooms/deluxe.jpg'),
  ('301', 'Suite', 3, 199.00, 4, '["WiFi", "TV", "Climatisation", "Mini-bar", "Vue mer", "Jacuzzi", "Salon"]', true, '/rooms/suite.jpg');

INSERT INTO public.services (name, description, price, category, is_available, image_url) VALUES
  ('Petit-déjeuner', 'Petit-déjeuner continental servi en chambre ou au restaurant', 15.00, 'Restauration', true, '/services/breakfast.jpg'),
  ('Spa', 'Accès complet au spa avec sauna et hammam', 45.00, 'Bien-être', true, '/services/spa.jpg'),
  ('Navette Aéroport', 'Transfert aller-retour depuis l''aéroport', 30.00, 'Transport', true, '/services/shuttle.jpg'),
  ('Location Vélo', 'Vélo de ville ou VTT pour la journée', 10.00, 'Loisirs', true, '/services/bike.jpg');

-- Vérification finale
SELECT 'Setup terminé avec succès!' AS status;
SELECT COUNT(*) AS total_rooms FROM public.rooms;
SELECT COUNT(*) AS total_services FROM public.services;
SELECT email, role FROM public.profiles WHERE role = 'admin';
