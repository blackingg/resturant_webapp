import { MotionConfig } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { SandwichIngredents } from "../components/SandwishIngredents";

import { DrinkModel } from "../components/drinksIngredents";
import ShopButtom from "../components/shopBottom";

import { IoIosClose } from "react-icons/io";

import { Scroll, ScrollControls } from "@react-three/drei";
import Sidebar from "../components/sideBar";
import ShopBottom from "../components/shopBottom";

function Shop() {
  const [selectedType, setSelectedType] = useState("Sandwiches");

  return (
    <div className="relative h-screen ">
      <MotionConfig transition={{ type: "spring" }}>
        <div
          className={`absolute inset-0  bottom-[30%] lg:bottom-[45%]
          } `}
        >
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
        <Sidebar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <div className="fixed bottom-0 px-5 py-2 left-0 right-0 bg-white shadow-md">
          <ShopBottom selectedType={selectedType} />
        </div>
      </MotionConfig>
    </div>
  );
}

export default Shop;
