import Home from "./pages/home";
import Shop from "./pages/shop";
import Blog from "./pages/blog";
import About from "./pages/about";

import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";

function App() {
  const navItems = [
    { label: "Home", page: "home", sign: AiFillHome },
    { label: "Shop", page: "shop", sign: FaCartShopping },
    { label: "Blog", page: "blog", sign: FaPenNib },
    { label: "About Us", page: "about", sign: IoMdInformationCircle },
  ];
  return (
    <>
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
          path="/blog"
          element={<Blog />}
        />
        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </>
  );
}

export default App;
