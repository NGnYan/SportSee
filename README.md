# 🏃‍♂️ SportSee - Tableau de bord d'analyse sportive

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-12.18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

SportSee est une plateforme complète d'analyse sportive qui permet aux utilisateurs de suivre et visualiser leurs performances athlétiques à travers des graphiques interactifs et des métriques en temps réel.

## 🎯 Vue d'ensemble

SportSee se compose de deux composants principaux :

- **Backend** - Une micro-API Node.js fournissant les données utilisateur, les métriques d'activité et les statistiques de performance
- **Frontend** - Un tableau de bord React avec des visualisations de données interactives

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js**
- **npm** ou **yarn**
- **Docker** (optionnel, pour le backend conteneurisé)

Vérifiez vos installations :

```bash
node --version
npm --version
```

## 🚀 Démarrage rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/NGnYan/SportSee.git
cd SportSee
```

### 2. Configurer et démarrer le backend

```bash
cd backend
yarn install
yarn dev
```

L'API sera accessible sur `http://localhost:3000`

Pour la configuration Docker, voir le [README backend](./backend/README.md).

### 3. Configurer et démarrer le frontend

Ouvrez un nouveau terminal :

```bash
cd frontend
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

# Utiliser le backend réel

```env
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:3000
```

# Utiliser les données mockées

```env
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Accéder à l'application

Naviguez vers l'une de ces URLs :

- `http://localhost:5173/user/12` (Karl Dovineau)
- `http://localhost:5173/user/18` (Cecilia Ratorez)

⚠️ **Important :** L'accès direct à `http://localhost:5173/` redirigera vers une page d'erreur. Un ID utilisateur valide dans l'URL est requis.

## ✨ Fonctionnalités

### API Backend

- API RESTful avec 4 endpoints
- Données mockées pour 2 utilisateurs
- Informations utilisateur, activité, sessions et métriques de performance
- Support Docker
- CORS activé pour l'intégration frontend

### Tableau de bord Frontend

- 📊 **Graphiques interactifs**
  - Graphique en barres de l'activité quotidienne (poids & calories)
  - Graphique linéaire de la durée moyenne des sessions
  - Graphique radar de performance
  - Graphique radial de complétion d'objectif
- ⚡ **Performance optimisée** avec Vite
- 🛡️ **Gestion d'erreurs** avec états de chargement
- 🎨 **UI moderne** avec design épuré

## 🛠️ Technologies

### Backend

- Node.js
- Express.js
- Yarn
- Docker (optionnel)

### Frontend

- React 18.x
- Recharts 2.x (visualisation de données)
- React Router (navigation)
- Vite 5.x (outil de build)
- CSS3 (styling)
- PropTypes (vérification de types)

## 👥 Utilisateurs disponibles

L'application comprend deux utilisateurs mockés :

| User ID | Nom             | Âge |
| ------- | --------------- | --- |
| 12      | Karl Dovineau   | 31  |
| 18      | Cecilia Ratorez | 34  |

### Endpoints API

Tous les endpoints suivent ce schéma : `http://localhost:3000/user/:userId/*`

| Endpoint                         | Description                                  |
| -------------------------------- | -------------------------------------------- |
| `/user/:userId`                  | Informations principales et données clés     |
| `/user/:userId/activity`         | Activité quotidienne (poids & calories)      |
| `/user/:userId/average-sessions` | Durée moyenne des sessions par jour          |
| `/user/:userId/performance`      | Métriques de performance par type d'activité |

## 🐛 Dépannage

### Le backend ne démarre pas

- **Port 3000 utilisé :** Arrêtez les autres processus ou changez le port
- **Problème de dépendances :** Supprimez `node_modules` et relancez `yarn install`
- **Problème Docker :** Assurez-vous que Docker Desktop est en cours d'exécution

### Le frontend ne peut pas se connecter au backend

- Vérifiez que le backend tourne sur `http://localhost:3000`
- Vérifiez que le fichier `.env` contient : `VITE_API_BASE_URL=http://localhost:3000`
- Videz le cache du navigateur et rechargez

### Erreur 404 sur les routes frontend

- Assurez-vous d'accéder à `/user/12` ou `/user/18` (pas à la racine `/`)
- Vérifiez que le backend retourne bien les données pour l'ID utilisateur

## 📜 Résumé des scripts

### Backend

```bash
yarn dev
yarn start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 🔄 Workflow de développement

1. **Démarrer le backend** → `cd backend && yarn dev`
2. **Démarrer le frontend** → `cd frontend && npm run dev`
3. **Accéder à l'app** → Naviguer vers `http://localhost:5173/user/12`
4. **Développer** → Apporter des modifications et voir les mises à jour en direct
5. **Tester** → Basculer entre les utilisateurs (12 et 18)

## 👤 Auteur

**NGnYan**

- GitHub: [@NGnYan](https://github.com/NGnYan)

---

📖 **Besoin d'aide ?** Consultez les README détaillés dans les dossiers `backend/` et `frontend/`.
