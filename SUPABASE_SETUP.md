# Configuration de Supabase pour La Grande Voile

## Étape 1: Créer un projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - Name: `la-grande-voile`
   - Database Password: (choisissez un mot de passe sécurisé)
   - Region: Choisissez la plus proche (Europe pour la France)

## Étape 2: Récupérer les credentials

Une fois le projet créé :
1. Allez dans **Settings** (roue dentée en bas à gauche)
2. Cliquez sur **API**
3. Copiez :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## Étape 3: Créer le fichier .env

À la racine du projet, créez un fichier `.env` :

```bash
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon
```

## Étape 4: Configurer la base de données

Allez dans le **SQL Editor** de Supabase et exécutez ce script :

```sql
-- Table des profils utilisateurs
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  firstName TEXT,
  lastName TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  phone TEXT,
  loyaltyPoints INTEGER DEFAULT 0,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des appartements
CREATE TABLE apartments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  size TEXT NOT NULL,
  priceLowSeason INTEGER NOT NULL,
  priceMidSeason INTEGER NOT NULL,
  priceHighSeason INTEGER NOT NULL,
  description TEXT,
  amenities JSONB,
  images JSONB,
  available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des réservations
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  apartmentId INTEGER REFERENCES apartments(id),
  userId UUID REFERENCES profiles(id),
  guestName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  checkIn DATE NOT NULL,
  checkOut DATE NOT NULL,
  guests INTEGER NOT NULL,
  totalPrice INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  requests TEXT,
  season TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des paramètres de l'hôtel
CREATE TABLE hotel_settings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  tagline TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  policies JSONB,
  features JSONB,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les performances
CREATE INDEX idx_bookings_apartment ON bookings(apartmentId);
CREATE INDEX idx_bookings_user ON bookings(userId);
CREATE INDEX idx_bookings_dates ON bookings(checkIn, checkOut);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Politiques pour profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = userId);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = userId);

CREATE POLICY "Admins can view all bookings"
  ON bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all bookings"
  ON bookings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, firstName, lastName, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'firstName',
    NEW.raw_user_meta_data->>'lastName',
    'client'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour appeler la fonction
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insertion des données initiales
INSERT INTO hotel_settings (name, description, tagline, address, phone, email, website, policies, features)
VALUES (
  'La Grande Voile',
  'Résidence de standing à Banyuls-sur-Mer - Les pieds dans l''eau',
  'LA GRANDE VOILE à BANYULS SUR MER allie parfaitement l''intimité et le calme d''un bel appartement et la convivialité d''un authentique village catalan.',
  '45 Avenue de la République, 66650 Banyuls-sur-Mer, France',
  '06 87 82 10 16',
  'contact@lagrandevoile.fr',
  'https://www.lagrandevoile.fr',
  '{
    "checkIn": "16:00",
    "checkOut": "10:00",
    "cancellation": "Annulation gratuite jusqu''à 7 jours avant l''arrivée",
    "children": "Les enfants sont les bienvenus",
    "pets": "Animaux non admis",
    "deposit": "Caution de 500€ demandée à l''arrivée"
  }'::jsonb,
  '[
    "Ascenseur dans la résidence",
    "WiFi gratuit dans tous les appartements",
    "Vue mer exceptionnelle",
    "Terrasses et balcons privés",
    "Equipements haut de gamme",
    "Proximité plage et centre-ville"
  ]'::jsonb
);

-- Création d'un admin par défaut (à modifier après première connexion)
-- Note: Vous devrez créer cet utilisateur via l'interface d'inscription
-- puis modifier manuellement son rôle dans la table profiles
```

## Étape 5: Modifier le rôle admin

Après avoir créé votre premier compte admin via l'interface :

```sql
-- Remplacez l'UUID par celui de votre utilisateur
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'votre-email@admin.com';
```

## Étape 6: Storage (pour les images)

1. Allez dans **Storage** dans le menu
2. Créez un nouveau bucket nommé `apartments-images`
3. Configurez les politiques :
   - Public pour la lecture
   - Authentifié uniquement pour l'écriture (admin seulement)

## Sécurité importante

### Dans Authentication > Settings :
- Activez "Enable Email confirmations" si vous voulez vérifier les emails
- Configurez les URLs de redirection :
  - Site URL: `https://votre-site.com`
  - Redirect URLs: Ajoutez vos URLs de production et développement

### Dans Authentication > Rate Limits :
- Ajustez les limites selon vos besoins

## Prochaines étapes

1. ✅ Configuration Supabase terminée
2. ⏳ Mettre à jour BookingContext avec Supabase
3. ⏳ Mettre à jour les pages Login/Register
4. ⏳ Ajouter la validation des formulaires
5. ⏳ Optimiser les performances (lazy loading)
6. ⏳ Améliorer le design pour moins "IA"

## Support

En cas de problème :
- Documentation Supabase : https://supabase.com/docs
- Vérifiez la console du navigateur pour les erreurs
- Consultez les logs dans Supabase > Database > Query Performance
