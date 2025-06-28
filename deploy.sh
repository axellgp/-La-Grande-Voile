#!/bin/bash

echo "🌊 La Grande Voile - Déploiement sur GitHub 🌊"
echo "=============================================="

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si on est dans un repository Git
if [ ! -d ".git" ]; then
    echo "📁 Initialisation du repository Git..."
    git init
fi

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers..."
git add .

# Commit
echo "💾 Création du commit..."
git commit -m "🎉 Initial commit - La Grande Voile hotel website"

# Demander l'URL du repository
echo ""
echo "🔗 Veuillez entrer l'URL de votre repository GitHub :"
echo "Format: https://github.com/VOTRE_USERNAME/la-grande-voile.git"
read -p "URL: " repo_url

# Ajouter l'origine
echo "🔗 Configuration de l'origine..."
git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"

# Renommer la branche
echo "🌿 Configuration de la branche main..."
git branch -M main

# Pousser vers GitHub
echo "🚀 Push vers GitHub..."
git push -u origin main

echo ""
echo "✅ Déploiement terminé !"
echo "📱 Votre site sera bientôt disponible sur GitHub Pages"
echo "🌐 URL: https://VOTRE_USERNAME.github.io/la-grande-voile/"
echo ""
echo "📋 N'oubliez pas d'activer GitHub Pages dans les paramètres du repository !"
