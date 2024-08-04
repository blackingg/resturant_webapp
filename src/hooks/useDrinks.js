import { create } from "zustand";
import { useGLTF } from "@react-three/drei";

const BASE_URL = "/models/";

export const DRINKS = {
  appleJuice: {
    src: BASE_URL + "Apple_juice.glb",
    price: 6500,
    icon: "☕",
  },
  grapeJuice: {
    src: BASE_URL + "Grape_Juice.glb",
    price: 6000,
    icon: "🧃",
  },
  orangeJuice: {
    src: BASE_URL + "Orange_Juice.glb",
    price: 5000,
    icon: "🧃",
  },
  milk: {
    src: BASE_URL + "milk.glb",
    price: 3000,
    icon: "🧃",
  },
};

Object.keys(DRINKS).forEach((drink) => {
  useGLTF.preload(DRINKS[drink].src);
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
