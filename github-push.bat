@echo off
REM Script pour pousser le projet vers GitHub (Windows)
REM Remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub

echo 🚀 Configuration du repository GitHub pour La Grande Voile
echo.

set /p USERNAME="Entrez votre nom d'utilisateur GitHub: "

if "%USERNAME%"=="" (
    echo ❌ Nom d'utilisateur requis
    pause
    exit /b 1
)

echo.
echo 📡 Ajout du remote GitHub...
git remote add origin https://github.com/%USERNAME%/la-grande-voile.git

echo 🔄 Changement de branche vers main...
git branch -M main

echo 📤 Push vers GitHub...
git push -u origin main

echo.
echo ✅ Projet poussé vers GitHub avec succès!
echo.
echo 🔗 Votre repository: https://github.com/%USERNAME%/la-grande-voile
echo 🌐 URL du site (après activation de GitHub Pages): https://%USERNAME%.github.io/la-grande-voile/
echo.
echo 📋 Prochaines étapes:
echo 1. Allez sur https://github.com/%USERNAME%/la-grande-voile/settings/pages
echo 2. Dans 'Source', sélectionnez 'GitHub Actions'
echo 3. Le site sera déployé automatiquement en 2-5 minutes
echo.
echo 🎯 Interface admin: https://%USERNAME%.github.io/la-grande-voile/login
echo    Email: admin@lagrandevoile.fr
echo    Mot de passe: admin123
echo.
pause
