# Iron Gym - Villenoy (V2)

Bienvenue dans le dépôt officiel du site web **Iron Gym**, une application web moderne et performante dédiée à la salle de sport Iron Gym située à Villenoy (77).

Ce projet a été conçu pour offrir une expérience utilisateur fluide, un design premium ("Gold & Black"), et une optimisation maximale pour le référencement (SEO).

![Logo Iron Gym](https://ik.imagekit.io/irongym/logo/Logo.png?tr=w-200)

## 📋 Fonctionnalités Principales

### 1. **Vitrine & Conversion**
- **Design Premium** : Charte graphique jaune et noire, animations fluides (GSAP, CSS), et typographie moderne.
- **Hero Section Dynamique** : Vidéo/Image de fond immersive avec appel à l'action clair (Inscription/Connexion).
- **Navigation Optimisée** : Menu responsive, pied de page complet, et bouton "Scroll to Top".

### 2. **Contenu Riche**
- **Présentation des Coachs** : Cartes 3D interactives (flip cards) pour découvrir l'équipe (Coach Wilmann, Simons, Dikense).
- **Parc Machines** : Carrousel interactif présentant les équipements (Technogym, Hammer Strength, etc.).
- **Tableau des Records** : Page "Hall of Fame" pour afficher les performances des membres (Squat, Bench, Deadlift).
- **Abonnements** : Présentation claire des tarifs (Standard, Étudiant, Police/Pompier). *Note : Cross Training inclus ou non selon les formules.*

### 3. **Pages Spécifiques**
- **Home** : Page d'accueil complète (vitrine).
- **Abonnement** : Détails des offres et redirection vers Resamania.
- **Machines** : Galerie des équipements.
- **Tableau** : Suivi des performances.
- **Contact** : Informations pratiques, carte Google Maps interactive, horaires et liens directs (téléphone/mail).

### 4. **Optimisations Techniques (SEO & Performance)**
- **SEO Avancé** :
    - Balises `<meta>` dynamiques (Titre, Description, Mots-clés) via `react-helmet-async`.
    - Données Structurées (JSON-LD) pour le référencement local (LocalBusiness).
    - Sitemap (`sitemap.xml`) et `robots.txt` configurés.
- **Performance** :
    - Images optimisées via **ImageKit** (CDN).
    - Lazy loading des composants lourds.
    - Code splitté et minifié avec Vite.
- **Accessibilité** : Structure sémantique HTML5, attributs ARIA, et contrastes vérifiés.

---

## 🛠️ Stack Technique

Ce projet utilise les dernières technologies du développement web moderne :

### **Frontend**
- **React 19** : Bibliothèque d'interface utilisateur (dernière version).
- **Vite** : Modeleur de module ultra-rapide.
- **UnoCss** : Framework CSS utilitaire pour un styling rapide et maintenable.
- **Lucide React** : Icônes vectorielles légères.
- **GSAP** : Animations complexes (si activé).
- **React Router v7** : Gestion du routage côté client.

### **Backend & Services**
- **Node.js & Express** : Serveur backend pour API personnalisée (gestion des images, etc.).
- **Stripe** : Intégration de paiement (prêt pour le futur).
- **Supabase** : Base de données et authentification (configuration prête).
- **ImageKit** : Optimisation et distribution des images en temps réel.

### **Déploiement**
- **Frontend** : Hébergé sur **Vercel** (CI/CD automatique).
- **Backend** : Hébergé sur **Render**.

---

## 🚀 Installation & Lancement

Pour lancer le projet localement sur votre machine :

### Prérequis
- Node.js (v18+)
- npm ou yarn

### Étapes
1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/votre-utilisateur/iron-gym-v2.git
    cd iron-gym-v2
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install --legacy-peer-deps
    ```
    *(Note : Utilisez `--legacy-peer-deps` en raison de dépendances en cours de mise à jour pour React 19)*

3.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

4.  **Accéder au site** :
    Ouvrez votre navigateur sur `http://localhost:5173`.

---

## 📁 Structure du Projet

```
iron-gym-v2/
├── public/              # Fichiers statiques (favicon, robots.txt, sitemap.xml)
├── src/
│   ├── composants/      # Composants réutilisables (Navbar, Footer, SEO, FlipCard...)
│   ├── pages/           # Pages principales (Home, Contact, Abonnement...)
│   ├── services/        # Appels API (api.js)
│   ├── App.jsx          # Point d'entrée principal avec les routes
│   └── main.jsx         # Point d'entrée React
├── backend/             # Serveur Node.js/Express
├── index.html           # Structure HTML de base
├── tailwind.config.js   # Configuration Tailwind
├── vite.config.js       # Configuration Vite
└── README.md            # Documentation du projet
```

---

## 📞 Contact & Support

Projet développé pour **Iron Gym Villenoy**.

Pour toute demande technique, maintenance ou évolution, veuillez contacter le développeur en charge du projet.

---
*Généré le 09/12/2025 - Version 2.0.0*
