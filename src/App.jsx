import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Developer from "./pages/developer";
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

function App() {
  const navItems = [
    { label: "Home", page: "", sign: AiFillHome },
    { label: "Shop", page: "shop", sign: FaCartShopping },
    { label: "Recipes", page: "recipes", sign: PiOvenFill },
    { label: "About Us", page: "about", sign: IoMdInformationCircle },
  ];

  const [started, setStarted] = useState(false);
  return (
    <>
      <LoadingScreen
        started={started}
        setStarted={setStarted}
      />
      <Navbar items={navItems} />
      <Routes>
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
          element={<Shop />}
        />

        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/developer"
          element={<Developer />}
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
    </>
  );
}

export default App;
