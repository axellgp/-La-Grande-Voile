-- ============================================
-- SCRIPT SQL COMPLET - HÔTEL LA GRANDE VOILE
-- Banyuls-sur-Mer
-- ============================================
-- Copiez-collez TOUT ce script dans l'éditeur SQL de Supabase
-- ============================================

-- 1. Supprimer les tables existantes (si nécessaire)
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. Création de la table profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'client',
    phone TEXT,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Création de la table rooms (chambres)
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 2,
    price_per_night DECIMAL(8,2) NOT NULL,
    description TEXT,
    amenities TEXT[],
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Création de la table services
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(8,2),
    duration_minutes INTEGER,
    category TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Création de la table reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guests INTEGER DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    special_requests TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT check_dates CHECK (check_out_date > check_in_date)
);

-- 6. Création de la table contact_messages
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Activation de RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 8. Politiques pour profiles
CREATE POLICY "Users can view own profile" ON profiles 
    FOR SELECT USING (auth.uid() = id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can update own profile" ON profiles 
    FOR UPDATE USING (auth.uid() = id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can insert profiles" ON profiles 
    FOR INSERT TO authenticated WITH CHECK (true);

-- 9. Politiques pour rooms
CREATE POLICY "Anyone can view rooms" ON rooms 
    FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins manage rooms" ON rooms 
    FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 10. Politiques pour services
CREATE POLICY "Anyone can view services" ON services 
    FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins manage services" ON services 
    FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 11. Politiques pour reservations
CREATE POLICY "Users view own reservations" ON reservations 
    FOR SELECT TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users create own reservations" ON reservations 
    FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins manage all reservations" ON reservations 
    FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 12. Politiques pour contact_messages
CREATE POLICY "Anyone can create contact messages" ON contact_messages 
    FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Admins manage contact messages" ON contact_messages 
    FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 13. Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 14. Insertion de l'administrateur
-- IMPORTANT: Le mot de passe est géré par Supabase Auth, pas dans cette table
-- Après avoir exécuté ce script, créez l'utilisateur via Supabase Auth panel
INSERT INTO profiles (id, email, full_name, role, phone, loyalty_points)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'axel.longepierre1@gmail.com', 'Axel Longepierre', 'admin', '+33 6 00 00 00 00', 0)
ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- 15. Données de démonstration - Chambres
INSERT INTO rooms (room_number, name, type, capacity, price_per_night, description, amenities, image_url) VALUES
('101', 'Chambre Standard Vue Mer', 'Standard', 2, 120.00, 'Chambre confortable avec vue imprenable sur la Méditerranée', ARRAY['WiFi', 'TV', 'Climatisation', 'Balcon'], 'https://images.unsplash.com/photo-1611746639243-4e95758c7c8f?w=800'),
('102', 'Chambre Double Confort', 'Double', 2, 150.00, 'Chambre spacieuse avec lit king-size et décoration marine', ARRAY['WiFi', 'TV', 'Climatisation', 'Mini-bar', 'Vue mer'], 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'),
('201', 'Suite Deluxe Banyuls', 'Suite', 3, 250.00, 'Suite luxueuse avec salon séparé et terrasse privée', ARRAY['WiFi', 'TV', 'Climatisation', 'Mini-bar', 'Jacuzzi', 'Terrasse'], 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'),
('202', 'Chambre Familiale', 'Familiale', 4, 200.00, 'Idéale pour les familles, avec deux chambres communicantes', ARRAY['WiFi', 'TV', 'Climatisation', 'Kitchenette', 'Vue piscine'], 'https://images.unsplash.com/photo-1611746644737-f1b0d481dbad?w=800'),
('301', 'Suite Présidentielle', 'Presidential', 4, 450.00, 'Notre suite la plus prestigieuse avec service majordome', ARRAY['WiFi', 'TV', 'Climatisation', 'Mini-bar', 'Jacuzzi', 'Service 24h', 'Vue panoramique'], 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800');

-- 16. Données de démonstration - Services
INSERT INTO services (name, description, price, duration_minutes, category) VALUES
('Petit-déjeuner continental', 'Buffet avec produits locaux et pains frais', 18.00, 60, 'Restauration'),
('Service de chambre', 'Disponibles 24h/24 et 7j/7', 12.00, 30, 'Hébergement'),
('Massage bien-être', 'Séance de 60 minutes en spa', 85.00, 60, 'Spa & Bien-être'),
('Location de vélos', 'Découvrez Banyuls à vélo', 15.00, 120, 'Loisirs'),
('Excursion vinicole', 'Visite de vignobles avec dégustation', 45.00, 180, 'Excursions'),
('Transfert aéroport', 'Navette depuis/vers Perpignan', 60.00, 45, 'Transport');

-- 17. Fonction pour vérifier les conflits de réservation
CREATE OR REPLACE FUNCTION check_reservation_conflict(
    p_room_id UUID,
    p_check_in DATE,
    p_check_out DATE,
    p_reservation_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM reservations 
        WHERE room_id = p_room_id 
        AND status != 'cancelled'
        AND id != COALESCE(p_reservation_id, '00000000-0000-0000-0000-000000000000'::UUID)
        AND (
            (check_in_date <= p_check_out AND check_out_date >= p_check_in)
        )
    );
END;
$$ LANGUAGE plpgsql;

-- 18. Trigger pour valider les chevauchements
CREATE OR REPLACE FUNCTION validate_reservation_overlap()
RETURNS TRIGGER AS $$
BEGIN
    IF check_reservation_conflict(NEW.room_id, NEW.check_in_date, NEW.check_out_date, NEW.id) THEN
        RAISE EXCEPTION 'Conflit de réservation: la chambre est déjà réservée pour cette période';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_reservation_overlap 
BEFORE INSERT OR UPDATE ON reservations
FOR EACH ROW EXECUTE FUNCTION validate_reservation_overlap();

-- ============================================
-- FIN DU SCRIPT SQL
-- ============================================
-- ÉTAPES SUIVANTES:
-- 1. Exécutez ce script dans Supabase SQL Editor
-- 2. Allez dans Authentication > Users et créez un utilisateur avec:
--    Email: axel.longepierre1@gmail.com
--    Mot de passe: admin301203
-- 3. Notez l'UUID de l'utilisateur créé
-- 4. Mettez à jour le profil avec cet UUID:
--    UPDATE profiles SET id = 'VOTRE_UUID_ICI' WHERE email = 'axel.longepierre1@gmail.com';
-- ============================================
