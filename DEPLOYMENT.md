# 🚀 Instructions de Déploiement GitHub

## Étapes pour héberger sur GitHub Pages

### 1. Créer un repository GitHub

1. Aller sur [GitHub](https://github.com)
2. Cliquer sur "New repository" (bouton vert)
3. Nom du repository : `la-grande-voile`
4. Description : `Site web moderne pour l'hôtel La Grande Voile à Banyuls-sur-Mer`
5. Cocher "Public" pour activer GitHub Pages gratuitement
6. **NE PAS** cocher "Add README file" (on en a déjà un)
7. Cliquer "Create repository"

### 2. Initialiser Git et pousser le code

Ouvrir un terminal dans le dossier du projet et exécuter :

```bash
# Initialiser le repository Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "🎉 Initial commit - La Grande Voile hotel website"

# Ajouter l'origine remote (remplacer YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/la-grande-voile.git

# Renommer la branche par défaut
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

### 3. Activer GitHub Pages

1. Aller sur votre repository GitHub
2. Cliquer sur l'onglet "Settings"
3. Dans le menu de gauche, cliquer sur "Pages"
4. Dans "Source", sélectionner "GitHub Actions"
5. Le déploiement se fera automatiquement à chaque push !

### 4. Accéder au site

Après quelques minutes, votre site sera disponible à :
```
https://YOUR_USERNAME.github.io/la-grande-voile/
```

## 🔄 Déploiement Automatique

Le workflow GitHub Actions se déclenche automatiquement :
- ✅ À chaque push sur la branche `main`
- ✅ À chaque Pull Request
- ✅ Build et déploiement en ~2-3 minutes

## 🌟 Fonctionnalités Disponibles en Ligne

Une fois hébergé, le site aura toutes les fonctionnalités :

### ✅ Pages Publiques
- Accueil avec hero immersif
- Galerie des appartements
- Calendrier des disponibilités  
- Page À propos et Contact
- Système de réservation

### ✅ Espace Client
- Inscription/Connexion
- Profil utilisateur
- Historique des réservations
- Programme de fidélité

### ✅ Interface Admin
- Dashboard complet
- Gestion des réservations
- Statistiques
- Logs d'activité

## 🔐 Comptes de Démonstration

### Admin
- **Email** : `admin@lagrandevoile.fr`
- **Mot de passe** : `admin123`

### Client Test
- **Email** : `user@example.com`  
- **Mot de passe** : `user123`

## 📱 Compatible

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablette (iPad, Android)
- ✅ Mobile (iOS, Android)
- ✅ Responsive design
- ✅ Performances optimisées

## 🎨 Personnalisation

Pour personnaliser le site :

1. **Couleurs** : Modifier `src/theme/` 
2. **Contenu** : Utiliser l'interface admin
3. **Images** : Remplacer dans `src/assets/images/`
4. **Tarifs** : Via l'interface admin

---

*🎉 Votre site La Grande Voile sera en ligne en quelques minutes !*
