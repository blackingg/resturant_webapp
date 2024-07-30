import { MotionConfig } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SandwichIngredents } from "../components/SandwishIngredents";
import ShopButtom from "../components/shopBottom";

import { Scroll, ScrollControls } from "@react-three/drei";

function Shop() {
  return (
    <div className="relative h-screen">
      <MotionConfig transition={{ type: "spring" }}>
        <div className="absolute inset-0 bottom-[40%]">
          <Canvas camera={{ position: [-2, 2.5, 5], fov: 30 }}>
            <color
              attach="background"
              args={["#ffa500"]}
            />
            <ScrollControls pages={1}>
              <Scroll>
                <Suspense fallback={null}>
                  <SandwichIngredents />
                </Suspense>
              </Scroll>
            </ScrollControls>
          </Canvas>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white shadow-md">
          <ShopButtom />
        </div>
      </MotionConfig>
    </div>
  );
}

export default Shop;
