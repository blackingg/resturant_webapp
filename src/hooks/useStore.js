import { create } from "zustand";

const useStore = create((set) => ({
  storedSelectedDrink: "No drink has been selected",
  storedSelectedMeal: [],
  openCart: false,
  cartItems: [],
  setSelectedDrink: (newSelectedDrink) =>
    set({ storedSelectedDrink: newSelectedDrink }),
  setSelectedMeal: (newStoredSelectedMeal) =>
    set({ storedSelectedMeal: newStoredSelectedMeal }),
  setOpenCart: (newOpenCart) => set({ openCart: newOpenCart }),
  addCartItem: (item) =>
    set((state) => {
      const newItem = { ...item, quantity: 1 };
      return { cartItems: [...state.cartItems, newItem] };
    }),
  clearCart: () => set({ cartItems: [] }),
  updateCartItemQuantity: (index, quantity) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item, idx) =>
        idx === index ? { ...item, quantity } : item
      );
      return { cartItems: updatedItems };
    }),
}));

export default useStore;
