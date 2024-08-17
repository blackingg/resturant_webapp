import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Recipes from "./pages/recipes";
import RecipeDetails from "./pages/recipeDetails";

import { LoadingScreen } from "./pages/loadingScreen";

import Navbar from "./components/navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { AiFillHome } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { PiOvenFill } from "react-icons/pi";
import { IoMdInformationCircle } from "react-icons/io";
import { SignIn } from "./pages/signIn";
import ForgotPassword from "./pages/forgotPassword";
import { AuthProvider } from "./context/authProvider";
import ProtectedRoute from "./components/protectedRoute";
import UpdatePassword from "./pages/updatePassword";

function App() {
  const navItems = [
    { label: "Home", page: "", sign: AiFillHome },
    { label: "Shop", page: "shop", sign: FaCartShopping },
    { label: "Recipes", page: "recipes", sign: PiOvenFill },
    { label: "About Us", page: "about", sign: IoMdInformationCircle },
  ];

  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState(false);

  return (
    <AuthProvider>
      <LoadingScreen
        loading={loading}
        setLoading={setLoading}
      />
      <Navbar items={navItems} />
      <Routes>
        <Route
          path="/signIn"
          element={
            <SignIn
              signIn={signIn}
              setSignIn={setSignIn}
            />
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <ForgotPassword
              signIn={signIn}
              setSignIn={setSignIn}
            />
          }
        />
        <Route
          path="/updatePassword"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/recipes"
          element={<Recipes />}
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetails />}
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
