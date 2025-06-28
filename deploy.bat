@echo off
echo 🌊 La Grande Voile - Déploiement sur GitHub 🌊
echo ==============================================

REM Vérifier si Git est installé
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git n'est pas installé. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

REM Vérifier si on est dans un repository Git
if not exist ".git" (
    echo 📁 Initialisation du repository Git...
    git init
)

REM Ajouter tous les fichiers
echo 📦 Ajout des fichiers...
git add .

REM Commit
echo 💾 Création du commit...
git commit -m "🎉 Initial commit - La Grande Voile hotel website"

REM Demander l'URL du repository
echo.
echo 🔗 Veuillez entrer l'URL de votre repository GitHub :
echo Format: https://github.com/VOTRE_USERNAME/la-grande-voile.git
set /p repo_url="URL: "

REM Ajouter l'origine
echo 🔗 Configuration de l'origine...
git remote add origin "%repo_url%" 2>nul || git remote set-url origin "%repo_url%"

REM Renommer la branche
echo 🌿 Configuration de la branche main...
git branch -M main

REM Pousser vers GitHub
echo 🚀 Push vers GitHub...
git push -u origin main

echo.
echo ✅ Déploiement terminé !
echo 📱 Votre site sera bientôt disponible sur GitHub Pages
echo 🌐 URL: https://VOTRE_USERNAME.github.io/la-grande-voile/
echo.
echo 📋 N'oubliez pas d'activer GitHub Pages dans les paramètres du repository !
pause
