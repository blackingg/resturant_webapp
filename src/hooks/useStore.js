import { create } from "zustand";

const useStore = create((set) => ({
  storedSelectedDrink: "No drink has been selected",
  storedSelectedMeal: [],
  openCart: false,
  cartItems: [],
  editingItemIndex: null,
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
  clearCart: () => set({ cartItems: [], editingItemIndex: null }),
  updateCartItemQuantity: (index, quantity) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item, idx) =>
        idx === index ? { ...item, quantity } : item
      );
      return { cartItems: updatedItems };
    }),
  setEditingItem: (index) => set({ editingItemIndex: index }),
  clearEditingItem: () => set({ editingItemIndex: null }),
  removeCartItem: (index) =>
    set((state) => ({
      cartItems: state.cartItems.filter((_, idx) => idx !== index),
      editingItemIndex: null,
    })),
  updateCartItem: (index, updatedItem) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item, idx) =>
        idx === index ? { ...updatedItem, quantity: item.quantity } : item
      );
      return { cartItems: updatedItems, editingItemIndex: null };
    }),
}));

export default useStore;
