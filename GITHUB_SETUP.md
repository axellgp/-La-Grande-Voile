# Configuration GitHub pour La Grande Voile

## Étapes pour créer et héberger le site sur GitHub Pages

### 1. Créer le repository sur GitHub
1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton "New" (ou "+" puis "New repository")
3. Remplissez les informations suivantes :
   - **Repository name**: `la-grande-voile`
   - **Description**: `Site web moderne pour l'hôtel La Grande Voile à Banyuls-sur-Mer - Système de réservation complet avec interface admin`
   - **Visibility**: ✅ Public (pour que tout le monde puisse y accéder)
   - **Initialize**: ❌ Ne pas cocher les options d'initialisation (README, .gitignore, licence)
4. Cliquez sur "Create repository"

### 2. Lier le projet local au repository GitHub
Une fois le repository créé, GitHub vous donnera l'URL. Exécutez ces commandes dans le terminal :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/la-grande-voile.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

### 3. Activer GitHub Pages
1. Dans votre repository GitHub, cliquez sur l'onglet "Settings"
2. Scrollez jusqu'à la section "Pages" dans le menu de gauche
3. Dans "Source", sélectionnez "GitHub Actions"
4. Le workflow de déploiement automatique est déjà configuré dans `.github/workflows/deploy.yml`

### 4. URL d'accès public
Une fois GitHub Pages activé, votre site sera accessible à l'adresse :
```
https://VOTRE_USERNAME.github.io/la-grande-voile/
```

### 5. Déploiement automatique
- À chaque push sur la branche `main`, le site sera automatiquement rebuilé et déployé
- Le processus prend généralement 2-5 minutes
- Vous pouvez suivre le progrès dans l'onglet "Actions" de votre repository

### 6. Configuration actuelle
Le projet est déjà configuré pour GitHub Pages avec :
- ✅ Base path `/la-grande-voile/` pour GitHub Pages
- ✅ Workflow GitHub Actions pour déploiement automatique
- ✅ Configuration Vite pour la production
- ✅ Toutes les routes préfixées correctement

### Notes importantes
- Le site sera public et accessible par tous
- Toutes les images et données sont incluses
- Le système de réservation fonctionne avec des données de test
- L'interface admin est accessible via `/la-grande-voile/login` (admin@lagrandevoile.fr / admin123)
