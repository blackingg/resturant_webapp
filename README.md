# 🍳 The Breakfast Place

A modern, interactive restaurant web application featuring immersive 3D experiences and a seamless ordering system. Built with React, Three.js, and Firebase.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=flat-square&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-via_R3F-000000?style=flat-square&logo=three.js)
![Firebase](https://img.shields.io/badge/Firebase-10.14.0-FFCA28?style=flat-square&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.3-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Features

### 🎨 Immersive 3D Experience
- **Interactive Hero Section** - A stunning 3D sandwich model that responds to mouse movements
- **3D Product Visualization** - Browse sandwiches and drinks in a fully interactive 3D environment
- **Smooth Animations** - Powered by Framer Motion and GSAP for fluid transitions

### 🛒 E-Commerce Functionality
- **Custom Order Builder** - Build your perfect sandwich with customizable ingredients
- **Smart Cart System** - Add, edit, remove, and manage quantities with Zustand state management
- **Real-time Updates** - Instant cart updates with persistent state

### 🔐 User Authentication
- **Firebase Authentication** - Secure sign-up, sign-in, and sign-out functionality
- **Protected Routes** - Secure access to shop and account features
- **Password Management** - Forgot password and update password functionality
- **User Data Storage** - Firestore integration for user profiles

### 📖 Recipe Section
- **Browse Recipes** - Explore a collection of breakfast recipes
- **Detailed Views** - Get in-depth recipe information with ingredients and instructions

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, Vite |
| **3D Graphics** | Three.js, React Three Fiber, React Three Drei |
| **Styling** | TailwindCSS, PostCSS |
| **Animation** | Framer Motion, GSAP, Maath |
| **State Management** | Zustand, Valtio |
| **Backend/Auth** | Firebase (Auth + Firestore), Supabase |
| **Routing** | React Router DOM v6 |
| **Icons** | React Icons |
| **HTTP Client** | Axios |

---

## 📁 Project Structure

```
resturant_webapp/
├── public/
│   ├── models/           # 3D GLB models (sandwiches, drinks, ingredients)
│   └── *.png             # Static images and assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── navbar.jsx
│   │   ├── heroSection.jsx
│   │   ├── Sandwich.jsx
│   │   ├── drinks.jsx
│   │   ├── sideBar.jsx
│   │   ├── shopBottom.jsx
│   │   └── ...
│   ├── pages/            # Application pages
│   │   ├── home.jsx
│   │   ├── shop.jsx
│   │   ├── cart.jsx
│   │   ├── recipes.jsx
│   │   ├── signIn.jsx
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── authProvider.jsx
│   │   ├── firebaseConfig.jsx
│   │   └── recipiesData.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useStore.js
│   │   ├── useDrinks.js
│   │   └── useSandwich.js
│   ├── fonts/            # Custom fonts configuration
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # TailwindCSS configuration
├── postcss.config.js     # PostCSS configuration
└── vercel.json           # Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blackingg/resturant_webapp.git
   cd resturant_webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🌐 Deployment

This project is configured for deployment on **Vercel**. The `vercel.json` file handles routing configuration for the SPA.

To deploy:

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

---

## 🎯 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with interactive 3D hero section |
| **Shop** | `/shop` | Browse and customize sandwiches & drinks (Protected) |
| **Recipes** | `/recipes` | Explore breakfast recipe collection |
| **Recipe Details** | `/recipes/:id` | View detailed recipe information |
| **About** | `/about` | Learn about The Breakfast Place |
| **Sign In** | `/signIn` | User authentication page |
| **Forgot Password** | `/forgotPassword` | Password recovery |
| **Update Password** | `/updatePassword` | Change password (Protected) |

---


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**blackingg**

- GitHub: [@blackingg](https://github.com/blackingg)

---

<p align="center">
  Made with ❤️ and ☕ for breakfast lovers everywhere
</p>
