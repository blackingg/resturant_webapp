import { MotionConfig } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { SandwichIngredents } from "../components/SandwishIngredents";
import { DrinkModel } from "../components/drinksIngredents";
import { Scroll, ScrollControls } from "@react-three/drei";
import Sidebar from "../components/sideBar";
import ShopBottom from "../components/shopBottom";
import useStore from "../hooks/useStore";
import { IoCartSharp } from "react-icons/io5";
import { Cart } from "./cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider"; // Import the useAuth hook

function Shop() {
  const [selectedType, setSelectedType] = useState("Sandwiches");

  const storedSelectedDrink = useStore((state) => state.storedSelectedDrink);
  const storedSelectedMeal = useStore((state) => state.storedSelectedMeal);

  const openCart = useStore((state) => state.openCart);
  const setOpenCart = useStore((state) => state.setOpenCart);

  const { user } = useAuth(); // Get the user state from AuthContext
  const navigate = useNavigate();

  const handleCartClick = () => {
    setOpenCart(!openCart);
  };

  useEffect(() => {
    if (!user) {
      // Check if user is not authenticated
      navigate("/signIn"); // Redirect to signIn page if not signed in
    }
  }, [user, navigate]); // Depend on the user state

  return (
    <div className="relative h-screen">
      <MotionConfig transition={{ type: "spring" }}>
        <div className={`absolute inset-0 bottom-[30%] lg:bottom-[45%]`}>
          <Canvas camera={{ position: [-2, 2.5, 5], fov: 30 }}>
            <color
              attach="background"
              args={["#ffa500"]}
            />
            <ScrollControls pages={0}>
              <Scroll>
                <Suspense fallback={null}>
                  {selectedType === "Sandwiches" ? (
                    <SandwichIngredents />
                  ) : (
                    <>
                      <ambientLight />
                      <DrinkModel />
                    </>
                  )}
                </Suspense>
              </Scroll>
              <Scroll html></Scroll>
            </ScrollControls>
          </Canvas>
        </div>
        <div
          onClick={handleCartClick}
          className="fixed top-24 right-6 md:right-12 z-40 p-3 rounded-md bg-gray-700"
        >
          <IoCartSharp color="#ffa500" />
        </div>

        {openCart ? <Cart selectedType={selectedType} /> : null}

        <Sidebar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <div className="fixed bottom-0 px-5 py-2 left-0 right-0 bg-white shadow-md">
          <ShopBottom
            selectedType={selectedType}
            storedSelectedDrink={storedSelectedDrink}
            storedSelectedMeal={storedSelectedMeal}
          />
        </div>
      </MotionConfig>
    </div>
  );
}

export default Shop;
