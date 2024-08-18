import { Float, Gltf } from "@react-three/drei";
import { DRINKS, useDrinks } from "../hooks/useDrinks";

import { Suspense } from "react";

import { animated, useSpring } from "@react-spring/three";

const INGREDIENT_SCALE = 3;
const INGREDIENT_SCALE_Y = 5;

export const Drink = ({ ingredient, showPrice, ...props }) => {
  const { positionY } = useSpring({ positionY: props["position-y"] });
  const { scale } = useSpring({
    from: {
      scale: 0.2,
    },
    to: {
      scale: 0.35,
    },
  });
  const addedToCart = useDrinks((state) => state.addedToCart);

  return (
    <animated.group
      {...props}
      scale={scale}
      position-y={positionY}
      rotation={[Math.PI / 30, 1.3, -0.1]}
    >
      <Float
        floatingRange={addedToCart ? [0, 0] : [-0.01, 0.01]}
        speed={addedToCart ? 0 : 4}
        rotationIntensity={0.5}
      >
        <Gltf
          src={DRINKS[ingredient.name].src}
          scale={[INGREDIENT_SCALE, INGREDIENT_SCALE_Y, INGREDIENT_SCALE]}
        />
      </Float>
    </animated.group>
  );
};
