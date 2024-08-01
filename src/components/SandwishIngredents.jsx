import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useSandwich } from "../hooks/meals";
import { Ingredient } from "./ingredents";
const INGREDIENT_SPACING = 0.2;
const INGREDIENT_SPACING_FINAL = 0.06;

export const SandwichIngredents = () => {
  const sandwich = useRef();
  const ingredients = useSandwich((state) => state.ingredients);
  const addedToCart = useSandwich((state) => state.addedToCart);
  const ingredientSpacing = addedToCart
    ? INGREDIENT_SPACING_FINAL
    : INGREDIENT_SPACING;
  useFrame(() => {
    if (addedToCart) {
      sandwich.current.rotation.y += 0.01;
    } else {
      sandwich.current.rotation.y = 0;
    }
  });
  return (
    <group position-y={(-ingredients.length * ingredientSpacing) / 2}>
      <group ref={sandwich}>
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={ingredient.id + ingredient.name}
            showPrice={index > 0 && index < ingredients.length - 1}
            ingredient={ingredient}
            position-y={index * ingredientSpacing}
          />
        ))}
      </group>
      <ContactShadows
        position-y={-0.5}
        opacity={0.6}
      />
    </group>
  );
};
