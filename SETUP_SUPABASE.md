# 🚀 Configuration Supabase - Hôtel Voile

## ✅ Ce qui est déjà fait

1. **Fichier `.env` créé** avec vos credentials Supabase
2. **Client Supabase configuré** dans `src/lib/supabase.js`
3. **Schéma SQL complet** prêt à exécuter dans `supabase_schema.sql`

## 📋 Étapes à suivre (5 minutes)

### Étape 1 : Exécuter le schéma SQL dans Supabase

1. Rendez-vous sur https://supabase.com/dashboard/project/swssdeifydiyfeglskpu
2. Allez dans **SQL Editor** (menu de gauche)
3. Cliquez sur **New Query**
4. Copiez-collez TOUT le contenu du fichier `supabase_schema.sql`
5. Cliquez sur **Run** (ou Ctrl+Enter)

✅ Si tout s'est bien passé, vous verrez "Success" et les tables seront créées.

### Étape 2 : Vérifier que les tables sont créées

1. Allez dans **Table Editor** (menu de gauche)
2. Vous devriez voir 6 tables :
   - `profiles`
   - `rooms`
   - `bookings`
   - `services`
   - `reviews`
   - `contacts`

### Étape 3 : Créer un compte administrateur

Dans le **SQL Editor** de Supabase, exécutez cette requête pour créer votre premier admin :

```sql
-- Créer un utilisateur admin (remplacez par votre email réel)
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, role)
VALUES (
  'admin@hotelvoile.com',
  crypt('VotreMotDePasseSecure123!', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Administrateur", "role": "admin"}',
  'authenticated'
);
```

⚠️ **Important** : Remplacez `admin@hotelvoile.com` et `VotreMotDePasseSecure123!` par vos propres valeurs.

### Étape 4 : Tester l'application

```bash
npm run dev
```

L'authentification devrait maintenant fonctionner avec Supabase !

## 🔧 Structure de la base de données

### Tables créées :

| Table | Description |
|-------|-------------|
| `profiles` | Informations utilisateurs (lié à auth.users) |
| `rooms` | Chambres de l'hôtel |
| `bookings` | Réservations clients |
| `services` | Services (restaurant, spa, activités) |
| `reviews` | Avis clients |
| `contacts` | Messages de contact |

### Sécurité (RLS) :

- ✅ Chaque utilisateur ne voit que ses propres données
- ✅ Les admins ont accès à toutes les données
- ✅ Les chambres et services sont publics en lecture
- ✅ Seuls les admins peuvent modifier les chambres/services

## 🎯 Prochaines étapes recommandées

1. **Tester l'authentification** - Créez un compte via le site
2. **Vérifier les données de démo** - Les chambres et services exemples sont déjà insérés
3. **Personnaliser** - Modifiez les données selon vos besoins réels

## 🆘 En cas de problème

### Erreur "relation already exists"
Les tables existent déjà. C'est normal si vous avez déjà exécuté le script. Passez à l'étape suivante.

### Erreur de permissions
Assurez-vous d'être connecté avec le rôle `postgres` ou un rôle admin dans Supabase.

### L'authentification ne fonctionne pas
1. Vérifiez que le fichier `.env` est bien présent à la racine
2. Redémarrez le serveur de développement (`Ctrl+C` puis `npm run dev`)
3. Vérifiez la console du navigateur pour des erreurs

## 📞 Besoin d'aide ?

Le schéma SQL inclut :
- ✅ Toutes les tables nécessaires
- ✅ Les politiques de sécurité (RLS)
- ✅ Les indexes pour la performance
- ✅ Les triggers pour les timestamps
- ✅ Des données de démo (chambres et services)

Tout est prêt à l'emploi ! 🎉
