import { useRef, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Sandwich } from "./Sandwich";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";

import { useNavigate } from "react-router-dom";

import { FaCartShopping } from "react-icons/fa6";

const State = proxy({
  pointer: { x: 0, y: 0 },
});

const AnimatedGroup = () => {
  const group = useRef();
  const state = useSnapshot(State);

  useFrame((_, delta) => {
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return (
    <group ref={group}>
      <Sandwich />
    </group>
  );
};

const HeroSection = () => {
  const { progress } = useProgress();

  const handleMouseMove = (event) => {
    State.pointer.x = event.clientX / window.innerWidth - 0.5;
    State.pointer.y = event.clientY / window.innerHeight - 0.5;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  return (
    <div className="flex flex-col space-y-8 lg:flex-row h-[100vh] pt-24 lg:pt-10 w-screen">
      <div className="flex flex-col items-start z-20 ml-6 md:ml-16 pt-16 md:pt-24 w-11/12 lg:w-3/5">
        {/* Modern Coffee/Breakfast Badge */}
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3.5 py-2 rounded-full mb-4">
          Morning Culinary Excellence
        </span>

        {/* Premium Layered Headline */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2A1A0E] tracking-tight leading-tight">
          Welcome to
          <span className="text-[#D97706] text-6xl md:text-8xl lg:text-9xl font-bold block mt-2 tracking-tight leading-none">
            The Breakfast Place
          </span>
        </h1>

        {/* Brand Description Sub-Headline */}
        <p className="text-[#5C4A3C] mt-6 text-base md:text-lg font-medium leading-relaxed max-w-lg">
          Freshly prepared gourmet morning classics, served daily with artisanal care and farm-fresh ingredients.
        </p>

        {/* Upgraded Modern CTA Button */}
        <button
          onClick={handleClick}
          className="bg-[#D97706] hover:bg-[#C26405] shadow-lg shadow-amber-600/10 hover:shadow-none hover:translate-y-[-2px] mt-8 py-4 px-8 flex items-center justify-center gap-2 text-base text-white font-bold rounded-md transition-all duration-300"
        >
          EXPLORE THE SHOP
          <FaCartShopping size={18} />
        </button>
      </div>

      <MotionConfig transition={{ type: "spring" }}>
        <Canvas camera={{ position: [11, 3, 1] }}>
          <Suspense fallback={null}>
            <AnimatedGroup/>
          </Suspense>
        </Canvas>
      </MotionConfig>
    </div>
  );
};

export default HeroSection;
