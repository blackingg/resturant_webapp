import { MotionConfig } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { SandwichIngredients } from "../components/SandwichIngredients";
import { DrinkModel } from "../components/drinkIngredients";
import { Scroll, ScrollControls, useProgress } from "@react-three/drei";
import Sidebar from "../components/sideBar";
import { CupProgress } from "./loadingScreen";
import ShopBottom from "../components/shopBottom";
import useStore from "../hooks/useStore";
import { IoCartSharp } from "react-icons/io5";
import { Cart } from "./cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

function Shop() {
  const [selectedType, setSelectedType] = useState("Sandwiches");
  const [introDone, setIntroDone] = useState(false);
  const [fill, setFill] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const { progress } = useProgress();

  // Paint the loading overlay first, then mount the heavy Canvas a frame
  // later — otherwise the navbar shows alone while the Canvas blocks render.
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setCanvasReady(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Models are usually preloaded, so real progress jumps straight to 100.
  // Ramp the cup fill over ~1.2s so the loading effect is still visible,
  // while never showing more than the real progress.
  useEffect(() => {
    const start = Date.now();
    const duration = 1200;
    let frameId;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setFill(Math.round(t * 100));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIntroDone(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const storedSelectedDrink = useStore((state) => state.storedSelectedDrink);
  const storedSelectedMeal = useStore((state) => state.storedSelectedMeal);

  const openCart = useStore((state) => state.openCart);
  const setOpenCart = useStore((state) => state.setOpenCart);
  const editingItemIndex = useStore((state) => state.editingItemIndex);
  const cartItems = useStore((state) => state.cartItems);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCartClick = () => {
    setOpenCart(!openCart);
  };

  const handleEditItem = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, [user, navigate]);

  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="relative h-screen bg-brand-butter">
      <div
        className={`absolute inset-0 z-[90] flex flex-col items-center justify-center gap-5 px-6 text-center bg-brand-butter transition-opacity duration-700 ${
          introDone ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <CupProgress progress={Math.min(fill, progress)} />
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-espresso">
          Build Your Morning Sandwich
        </h2>
        <p className="text-brand-mocha text-sm md:text-base max-w-sm">
          Tap an ingredient to stack it on — fresh from the griddle.
        </p>
      </div>
      <MotionConfig transition={{ type: "spring" }}>
        <div className={`absolute inset-0 top-16 bottom-[18%] lg:bottom-[32%]`}>
          {canvasReady && (
          <Canvas camera={{ position: [-2, 2.5, 5], fov: 30 }}>
            <color
              attach="background"
              args={["#FFE4C2"]}
            />
            <ScrollControls pages={0}>
              <Scroll>
                <Suspense fallback={null}>
                  {selectedType === "Sandwiches" && <SandwichIngredients />}
                  {selectedType === "Drinks" && (
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
          )}
        </div>

        <div
          onClick={handleCartClick}
          className="fixed top-24 right-6 md:right-12 z-40 p-3 rounded-md bg-brand-espresso hover:bg-black transition-colors cursor-pointer shadow-lg hover:shadow-xl group"
        >
          <IoCartSharp
            color="#FFB240"
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
          {cartItemsCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-amber rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
              {cartItemsCount}
            </div>
          )}
        </div>

        {editingItemIndex !== null && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-md bg-brand-butter border border-brand-sand text-brand-espresso text-xs md:text-sm font-medium shadow-md flex items-center gap-2">
            <span className="animate-pulse">✏️</span>
            <span>Editing item #{editingItemIndex + 1}</span>
          </div>
        )}

        {openCart ? (
          <Cart
            selectedType={selectedType}
            onEditItem={handleEditItem}
          />
        ) : null}

        <div className="fixed bottom-0 px-5 pt-8 pb-3 left-0 right-0 bg-brand-milk border-t border-brand-sand shadow-[0_-4px_20px_rgba(42,26,14,0.08)]">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
            <Sidebar
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
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
