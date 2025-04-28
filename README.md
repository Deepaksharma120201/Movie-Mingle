# 🎬 Netflix Clone using React + Vite

A modern, responsive Netflix UI clone built using **React** and **Vite** with Firebase authentication, Firestore-powered watchlist, dynamic routing, and TMDB API integration.

> ⚡ Fully responsive, with a drawer navigation on small screens, toast notifications, and dark theme styling.

## 🚀 Demo

👉 **[Visit this link see the live demo](https://netflix-clone-sage-xi.vercel.app/)**

## 🚀 Features

- 🔐 **Authentication**

  - Email/Password login and signup
  - Google OAuth
  - Protected Routes

- 🎞️ **Browse Movies & TV Shows**

  - Home, Movies, Shows, Trending pages
  - Search by keyword
  - Detailed view with backdrop and info

- ❤️ **Watchlist**

  - Add/remove movies or shows to personal list
  - Synced with Firebase Firestore

- 🌙 **Responsive Design**

  - Drawer menu on smaller screens
  - Desktop navigation on larger screens

- 🔔 **Toast Notifications**
  - Feedback for user actions (login, watchlist)

## 🛠️ Tech Stack

| Category       | Technology                |
| -------------- | ------------------------- |
| Frontend       | React + Vite              |
| Styling        | CSS Modules               |
| Routing        | React Router DOM          |
| Authentication | Firebase Auth             |
| Database       | Firebase Firestore        |
| State          | React Context API         |
| Icons          | React Icons / FontAwesome |
| Notifications  | React Toastify            |
| API            | TMDB API                  |

## 📁 Project Structure

```
src/
├── assets/             → Static assets (e.g., logo, background images)
├── components/         → Reusable UI components like Navbar, Cards
├── context/
│   └── authProvider.js → React Context for Auth state & functions
├── pages/              → Main pages like Home, Movies, Shows, Login, Search
├── styles/             → All custom CSS stylesheets
├── App.jsx             → Defines main routes and layout
├── main.jsx            → React entry point
└── firebase.js         → Firebase config and exports
```

## 🔧 Getting Started

### 🧱 Clone the Repository

```bash
git clone https://github.com/Deepaksharma120201/Netflix-Clone
cd Netflix-Clone
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔥 Firebase Configuration

```
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new Firebase project
3. Enable **Authentication**:
   - Go to **Authentication > Sign-in method**
   - Enable **Email/Password**
   - Enable **Google** (optional)
4. Set up **Cloud Firestore**:
   - Go to **Firestore Database > Create Database**
```

### ➕ Add Firebase Config

Create a `firebase.js` file inside `src/`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 🌐 TMDB API Setup

```
1. Go to [TMDB API](https://www.themoviedb.org/documentation/api)
2. Sign up and create an API key
3. Create a `.env` file in the root directory:

.env
VITE_TMDB_API_KEY=your_tmdb_api_key

4. Use the key in API requests:

const url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
```

## 💻 Running the Project

Start the development server:

```bash
npm run dev
```

Then visit:

```
http://localhost:5173
```

## 🔒 Firebase Security Rules (Optional)

Add the following rules in Firebase Firestore settings:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /watchlist/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 🧾 Credits

- 🎥 [TMDB API](https://www.themoviedb.org/) — Movie & TV show data
- 🔐 [Firebase](https://firebase.google.com/) — Authentication & backend
- 🎨 [React Icons](https://react-icons.github.io/react-icons/) — Icon packs
- 🔔 [React Toastify](https://fkhadra.github.io/react-toastify/introduction) — Toast notifications

## 📄 License

This project is licensed under the **MIT License** — free to use for personal or commercial projects.

## 🙋‍♂️ Author

Made with ❤️ by [Deepak Sharma](https://github.com/Deepaksharma120201).  
If you like this project, give it a ⭐ and share it!
