# 🔐 Admin Dashboard – React + Vite + Firebase

Ce projet est un site administrateur construit avec **React 19**, **Vite 7**, **Firebase (Auth + Hosting)**, et **Tailwind CSS**.  
Il permet la gestion des utilisateurs via une interface sécurisée, avec authentification Firebase et déploiement via Firebase Hosting.

---

## 🚀 Technologies utilisées

- React `^19.1.0`
- Vite `^7.0.0`
- Firebase `^11.9.1` (Auth + Hosting)
- Tailwind CSS `^4.1.11`
- React Router DOM `^7.6.2`
- React Toastify, React Select, React Datepicker
- ESLint (optionnel)

---

## ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé :

- **Node.js** `>=18.x`
- **npm** ou **yarn**
- **Firebase CLI** installé globalement :
  ```bash
  npm install firebase
  npm install -g firebase-tools
  ```

## 📥 Installation du projet

Clonez le repo puis installez les dépendances :

``bash
git clone <lien-du-repo>
cd nom-du-projet
npm install

## Creer un projet firebase sur la console

Pour un nouveau projet, vous pouvez retrouver votre config depuis console.firebase.google.com.
Allez sur le site de Firebase(si vous n'avez pas encore de compte ), lancer la console depuis le site et créé un nouveau projet web(</>),
Renommer firebaseConfig par FirebaseConfig.js, et copier le token du nouveau projet donner par firebase (fichier)
et rajouter ces deux lignes (commenter aussi dans le firebaseconfig originel):

``bash
export const db = getFirestore(app);
export const auth = getAuth(app);

## ▶️ Lancement du projet en développement

Dans le terminal lancer:
npm run dev
Le site sera disponible par défaut sur : http://localhost:5173(ou un autre 517\*)

## 🔐 Authentification

Le projet utilise Firebase Auth (Email/Password).
L’authentification est gérée côté client avec redirection en cas de non-connexion.
Elle est disponible dans le authProvider et le dossier auth

## 🔼 Déploiement sur Firebase Hosting

Allez sur la doc firebase: https://firebase.google.com/docs/hosting/quickstart

Suivez le get started et une fois prêt à déployer(firebase deploy onlyhosting(à ne pas faire)) :

bash:
npm run build
firebase deploy
(Sauf si vous maitriser le hosting garder le hosting en dist (Entrée) ,choisissez la version one page index.html(y),eviter d'intégrer github(n) et eviter d'overwrite)

⚠️ Assurez-vous d’avoir bien initialisé Firebase

## 📁 Structure simplifiée

src/
│
├── assets/ # Images & fichiers statiques
├── components/ # Composants React
├── Providers/ # Fournisseurs de contexte (auth, db, etc.)
├── Config/ # Autres fichiers de config
├── App.jsx # Root de l'application
└── main.jsx # Point d'entrée

## 🧑‍💻 Auteur

Développé par Franck ada.
