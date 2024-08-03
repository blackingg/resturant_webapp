import { create } from "zustand";

const useStore = create((set) => ({
  storedSelectedDrink: "No drink has been selected",
  storedSelectedMeal: null,
  setSelectedDrink: (newSelectedDrink) =>
    set({ storedSelectedDrink: newSelectedDrink }),
  setSelectedMeal: (newStoredSelectedMeal) =>
    set({ storedSelectedMeal: newStoredSelectedMeal }),
}));

export default useStore;
