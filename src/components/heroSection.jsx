import { useRef, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Sandwich } from "./Sandwich";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";

import { Link } from "react-router-dom";

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

  return (
    <div className="flex flex-col space-x-10 lg:flex-row h-[100vh] pt-16 w-screen">
      <h1 className="z-20 ml-5 md:ml-16 pt-20 md:pt-16 w-1/5 text-[#6F4E37] text-7xl md:text-8xl font-semibold">
        Welcome to The Breakfast Place
      </h1>
      <MotionConfig transition={{ type: "spring" }}>
        <Canvas camera={{ position: [11, 3, 1] }}>
          <Suspense fallback={null}>
            <AnimatedGroup />
          </Suspense>
        </Canvas>
      </MotionConfig>
    </div>
  );
};

export default HeroSection;
