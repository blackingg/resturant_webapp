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

export const DRINKS = {
  appleJuice: {
    src: BASE_URL + "Apple_juice.glb",
    price: 6.5,
    icon: "☕",
  },
  grapeJuice: {
    src: BASE_URL + "Grape_Juice.glb",
    price: 6.0,
    icon: "🧃",
  },
  orangeJuice: {
    src: BASE_URL + "Orange_Juice.glb",
    price: 5.0,
    icon: "🧃",
  },
  milk: {
    src: BASE_URL + "milk.glb",
    price: 3.0,
    icon: "🧃",
  },
};

// Preload models
Object.keys(INGREDIENTS).forEach((ingredient) => {
  useGLTF.preload(INGREDIENTS[ingredient].src);
});

Object.keys(DRINKS).forEach((drink) => {
  useGLTF.preload(DRINKS[drink].src);
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
        const newTotalSandwich =
          state.total - (INGREDIENTS[ingredientToRemove.name]?.price || 0);

        localStorage.setItem("ingredients", JSON.stringify(newIngredients));
        localStorage.setItem("total", JSON.stringify(newTotalSandwich));

        return {
          total: newTotalSandwich,
          ingredients: newIngredients,
        };
      }),
    setAddedToCart: (addedToCart) => set({ addedToCart }),
  };
});

export const useDrinks = create((set) => {
  const getInitialState = () => {
    const storedDrink = JSON.parse(localStorage.getItem("drink"));
    const storedTotal = JSON.parse(localStorage.getItem("drinkTotal"));
    return {
      drink: storedDrink || { name: "milk", id: 0 },
      total: storedTotal || DRINKS["milk"].price,
      addedToCart: false,
    };
  };

  return {
    ...getInitialState(),
    setDrink: (drinkName) =>
      set((state) => {
        const newDrink = { name: drinkName, id: state.drink.id + 1 };
        const newTotalDrinks = DRINKS[drinkName].price;

        localStorage.setItem("drink", JSON.stringify(newDrink));
        localStorage.setItem("drinkTotal", JSON.stringify(newTotalDrinks));

        return {
          drink: newDrink,
          total: newTotalDrinks,
        };
      }),
    removeDrink: () =>
      set(() => {
        localStorage.removeItem("drink");
        localStorage.removeItem("drinkTotal");

        return {
          total: 0,
          drink: null,
        };
      }),
    setAddedToCart: (addedToCart) => set({ addedToCart }),
  };
});
