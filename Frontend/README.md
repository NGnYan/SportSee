# 🏃‍♂️ SportSee - Dashboard Analytics

## 🎯 Description

SportSee est une application de tableau de bord permettant aux utilisateurs de suivre leurs activités sportives à travers des graphiques interactifs et des indicateurs de performance.

## ✨ Fonctionnalités

- 📊 **Graphiques interactifs** - Visualisation des données avec Recharts

  - Graphique d'activité quotidienne (BarChart)
  - Durée moyenne des sessions (AreaChart)
  - Graphique de performance radar (RadarChart)
  - Score d'objectif (RadialBarChart)

- 📱 **Design responsive** - Mise en page optimisée pour les résolutions à partir de 1024×780px
- 🎨 **UI moderne** - Interface utilisateur épurée et intuitive
- ⚡ **Performance optimisée** - Chargement rapide et animations fluides
- 🔄 **Gestion d'état** - Hooks React personnalisés pour la récupération de données
- 🛡️ **Gestion d'erreurs** - Affichage des états de chargement et d'erreur

## 🛠️ Technologies

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-8884d8?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Frontend

- **React**
- **Recharts**
- **React Router**
- **PropTypes**
- **Vite**
- **ESLint**
- **CSS3**

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js**
- **npm** ou **yarn**

Vérifiez vos versions :

```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/NGnYan/SportSee.git
cd sportsee
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration

Créez un fichier `.env` à la racine du projet :

VITE_API_BASE_URL=http://localhost:3000

## 🎬 Démarrage

### Démarrer le backend

Le projet nécessite un backend pour fonctionner. Assurez-vous que le serveur API est lancé sur le port 3000.

### Démarrer le frontend

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:5173`

## ⚠️ Important — Navigation et URLs du frontend

Lors des tests, assurez-vous d’accéder directement à une URL du type : http://localhost:5173/user/12

Si vous ouvrez simplement : http://localhost:5173/ vous serez redirigé vers la **ErrorPage**.

En effet, l’application nécessite obligatoirement **un `userId` valide dans l’URL** pour fonctionner correctement.

### 🔍 Pourquoi ce fonctionnement ?

L’architecture du frontend repose sur une route dynamique définie comme : /user/:id

## 🔌 API

### Endpoints disponibles

| Méthode | Endpoint                     | Description              |
| ------- | ---------------------------- | ------------------------ |
| GET     | `/user/:id`                  | Informations utilisateur |
| GET     | `/user/:id/activity`         | Activité quotidienne     |
| GET     | `/user/:id/average-sessions` | Sessions moyennes        |
| GET     | `/user/:id/performance`      | Performance              |

### Format des données

Les données sont automatiquement transformées via `transformFactory` :

## 📜 Scripts disponibles

```bash
# Démarrer en mode développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter le code
npm run lint
```
