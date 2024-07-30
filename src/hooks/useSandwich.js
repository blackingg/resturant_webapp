import { create } from "zustand";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const BASE_URL = "/models/";

export const INGREDIENTS = {
  bread: {
    src: BASE_URL + "Bread_Slice_Bread_0.glb",
    price: 0.5,
    icon: "🍞",
  },
  lettuce: {
    src: BASE_URL + "Lettuce_Slice_Lettuce_0.glb",
    price: 0.5,
    icon: "🥬",
  },
  mushroom: {
    src: BASE_URL + "Mushroom_Slice_Mushroom_0.glb",
    price: 1,
    icon: "🍄",
  },
  tomato: {
    src: BASE_URL + "Tomato_Slice_Tomato_0.glb",
    price: 0.5,
    icon: "🍅",
  },
  cheese: {
    src: BASE_URL + "Cheese_Slice_Cheese_0.glb",
    price: 1,
    icon: "🧀",
  },
  chicken: {
    src: BASE_URL + "Chicken_Slice_Chicken_0.glb",
    price: 2,
    icon: "🍗",
  },
  sausage: {
    src: BASE_URL + "Sausage_Slice_Sausage_0.glb",
    price: 1.5,
    icon: "🌭",
  },
  salami: {
    src: BASE_URL + "Salami_Slice_Salami_0.glb",
    price: 1.5,
    icon: "🍖",
  },
  bacon: {
    src: BASE_URL + "Bacon_Slice_Bacon_0.glb",
    price: 1.5,
    icon: "🥓",
  },
  patty: {
    src: BASE_URL + "Patty_Slice_Patty_0.glb",
    price: 2,
    icon: "🍔",
  },
};

// Preload models
Object.keys(INGREDIENTS).forEach((ingredient) => {
  useGLTF.preload(INGREDIENTS[ingredient].src);
});

export const useSandwich = create((set) => {
  const getInitialState = () => {
    const storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
    const storedTotal = JSON.parse(localStorage.getItem("total"));
    return {
      ingredients: storedIngredients || [
        { id: 0, name: "bread" },
        { id: 1, name: "bread" },
      ],
      total: storedTotal || 1.0,
      addedToCart: false,
    };
  };

  return {
    ...getInitialState(),
    addIngredient: (ingredient) =>
      set((state) => {
        const newIngredients = [
          ...state.ingredients.slice(0, -1),
          { name: ingredient, id: state.ingredients.length },
          { name: "bread", id: state.ingredients.length + 1 },
        ];
        const newTotal = state.total + INGREDIENTS[ingredient].price;

        localStorage.setItem("ingredients", JSON.stringify(newIngredients));
        localStorage.setItem("total", JSON.stringify(newTotal));

        return {
          total: newTotal,
          ingredients: newIngredients,
        };
      }),
    removeIngredient: (ingredient) =>
      set((state) => {
        const ingredientToRemove = state.ingredients.find(
          (ing) => ing.id === ingredient.id
        );
        if (!ingredientToRemove) return state;

        const newIngredients = state.ingredients.filter(
          (ing) => ing.id !== ingredient.id
        );
        const newTotal =
          state.total - (INGREDIENTS[ingredientToRemove.name]?.price || 0);

        localStorage.setItem("ingredients", JSON.stringify(newIngredients));
        localStorage.setItem("total", JSON.stringify(newTotal));

        return {
          total: newTotal,
          ingredients: newIngredients,
        };
      }),
    setAddedToCart: (addedToCart) => set({ addedToCart }),
  };
});
