import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useDrinks } from "../hooks/meals";
import { Drink } from "./drinks";

export const DrinkModel = () => {
  const drink = useRef();
  const selectedDrink = useDrinks((state) => state.drink); // Get the selected drink
  const addedToCart = useDrinks((state) => state.addedToCart);

  useEffect(() => {
    console.log(selectedDrink);
  });

  useFrame(() => {
    if (addedToCart) {
      drink.current.rotation.y += 0.01;
    } else {
      drink.current.rotation.y = 0;
    }
  });

  return (
    <group position-y={0}>
      <group ref={drink}>
        {selectedDrink && (
          <Drink
            key={selectedDrink.id + selectedDrink.name}
            showPrice={true}
            ingredient={selectedDrink}
            position-y={0}
          />
        )}
      </group>
      <ContactShadows
        position-y={-0.5}
        opacity={0.6}
      />
    </group>
  );
};
