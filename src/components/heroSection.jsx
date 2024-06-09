import { useRef, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { RandomizedLight, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Pizza } from "./Pizza";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";

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
      <Pizza />
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
    <div className="flex flex-col pt md:flex-row h-[100vh] pt-16 w-screen ">
      <h1 className="z-20 ml-5 md:ml-16 pt-20 md:pt-16 pr-16 w-10 text-[#B22222] text-7xl md:text-8xl font-semibold">
        Welcome to Pizza Hut
      </h1>
      <MotionConfig transition={{ type: "spring" }}>
        <Canvas camera={{ position: [11, 3, 1] }}>
          <directionalLight
            color={"#FF6347"}
            intensity={0.8}
          />
          <RandomizedLight
            amount={2}
            radius={9}
            intensity={0.55}
            ambient={0.25}
            position={[5, 5, -10]}
          />
          <RandomizedLight
            amount={1}
            radius={8}
            intensity={0.25}
            ambient={0.55}
            position={[5, 5, -9]}
          />
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <AnimatedGroup />
          </Suspense>
        </Canvas>
      </MotionConfig>
    </div>
  );
};

export default HeroSection;
