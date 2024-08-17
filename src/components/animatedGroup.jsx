import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sandwich } from "./Sandwich";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";

const AnimatedGroup = (State) => {
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

export default AnimatedGroup;
