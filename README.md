# 🌊 La Grande Voile - Hotel Website

Un site web moderne et élégant pour l'hôtel "La Grande Voile" à Banyuls-sur-Mer, France.

🔗 **Site en ligne**: https://axellgp.github.io/-La-Grande-Voile/

## ✨ Fonctionnalités

### 🏨 Pour les Clients
- **Navigation intuitive** : Découverte des appartements avec galeries photos
- **Système de réservation** : Demandes de réservation avec validation administrateur
- **Calendrier de disponibilités** : Visualisation en temps réel des créneaux libres
- **Profil utilisateur** : Gestion des réservations et programme de fidélité
- **Responsive design** : Optimisé pour mobile, tablette et desktop

### 👨‍💼 Pour les Administrateurs
- **Dashboard complet** : Vue d'ensemble des réservations et statistiques
- **Gestion des demandes** : Validation/refus des réservations en un clic
- **Édition de contenu** : Modification du contenu du site et des tarifs
- **Logs d'activité** : Historique complet des actions avec export
- **Gestion des appartements** : CRUD complet des logements

## 🏗️ Technologies Utilisées

### Frontend
- **React 18** - Interface utilisateur moderne
- **Vite** - Build tool ultra-rapide
- **Styled Components** - CSS-in-JS avec thème méditerranéen
- **Framer Motion** - Animations fluides et professionnelles
- **React Router** - Navigation côté client
- **React Hook Form** - Gestion des formulaires
- **Lucide React** - Icônes modernes

### Design & UX
- **Palette méditerranéenne** : Bleus océan, dorés soleil, corail
- **Typographie** : Playfair Display + Inter
- **Mobile-first** : Design responsive optimisé
- **Accessibilité** : Standards WCAG respectés

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/la-grande-voile.git
cd la-grande-voile

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`
git clone [url-du-repo]
cd la-grande-voile

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

Le site sera accessible sur `http://localhost:3000`

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Navbar.jsx      # Navigation principale
│   ├── Footer.jsx      # Pied de page
│   └── ScrollToTop.jsx # Utilitaire de scroll
├── pages/              # Pages principales
│   ├── Home.jsx        # Page d'accueil
│   ├── Rooms.jsx       # Liste des chambres
│   ├── Contact.jsx     # Page de contact
│   ├── Login.jsx       # Connexion
│   └── ...
├── context/            # Gestion d'état
│   ├── AuthContext.jsx    # Authentification
│   └── BookingContext.jsx # Réservations
├── styles/             # Styles globaux
│   ├── theme.js        # Thème design
│   └── GlobalStyles.js # Styles globaux
└── App.jsx            # Composant principal
```

## 🔐 Comptes de Démonstration

### Administrateur
- **Email**: `admin@lagrandevoile.com`
- **Mot de passe**: `admin123`

### Client
- **Email**: `client@example.com`
- **Mot de passe**: `client123`

## 🏨 Chambres Disponibles

1. **Chambre Vue Mer Deluxe** - 180€/nuit
2. **Suite Junior Vue Vignobles** - 250€/nuit  
3. **Chambre Familiale Jardin** - 220€/nuit
4. **Suite Présidentielle Panoramique** - 450€/nuit
5. **Chambre Cosy Centre-Ville** - 120€/nuit
6. **Appartement Terrasse Madeloc** - 300€/nuit

## 🌍 Inspiration Banyuls-sur-Mer

Le design s'inspire des éléments authentiques de Banyuls-sur-Mer :
- **Couleurs** : Bleu méditerranéen, or du soleil, rouge terracotta
- **Paysages** : Vignobles en terrasses, mer turquoise, montagnes
- **Culture** : Architecture catalane, tradition viticole
- **Attractions** : Musée Maillol, sentier sous-marin, Tour Madeloc

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints** adaptatifs
- **Navigation mobile** avec menu hamburger
- **Grilles flexibles** pour tous les écrans
- **Images optimisées** pour différentes résolutions

## 🎯 Fonctionnalités à Développer

- [ ] Système de paiement en ligne
- [ ] Chat en temps réel avec l'hôtel
- [ ] API de réservation complète
- [ ] Intégration avec des OTA (Booking.com, etc.)
- [ ] Système de reviews clients
- [ ] Newsletter automatisée
- [ ] Multi-langue (FR/EN/ES/CA)

## 🤝 Contribution

Ce projet est ouvert aux contributions. Pour contribuer :

1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question concernant ce projet :
- **Email**: contact@lagrandevoile.com
- **Téléphone**: +33 4 68 88 12 34
- **Adresse**: 12 Avenue de la Méditerranée, 66650 Banyuls-sur-Mer, France

---

*Fait avec ❤️ à Banyuls-sur-Mer*
