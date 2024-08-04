import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useSandwich } from "../hooks/useSandwich";
import { Ingredient } from "./ingredents";
import useStore from "../hooks/useStore";

const INGREDIENT_SPACING = 0.2;
const INGREDIENT_SPACING_FINAL = 0.15;

export const SandwichIngredents = ({}) => {
  const sandwich = useRef();
  const ingredients = useSandwich((state) => state.ingredients);
  const addedToCart = useSandwich((state) => state.addedToCart);

  const ingredientSpacing = addedToCart
    ? INGREDIENT_SPACING_FINAL
    : INGREDIENT_SPACING;
  useFrame(() => {
    if (addedToCart) {
      sandwich.current.rotation.y += 0;
    } else {
      sandwich.current.rotation.y = 0;
    }
  });

  const setSelectedMeal = useStore((state) => state.setSelectedMeal);

  useEffect(() => {
    console.log("ingredients", ingredients);
    setSelectedMeal(ingredients);
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
