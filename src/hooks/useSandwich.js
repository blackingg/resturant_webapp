import { create } from "zustand";
import { useGLTF } from "@react-three/drei";

const BASE_URL = "/models/";

export const INGREDIENTS = {
  bread: {
    src: BASE_URL + "Bread_Slice_Bread_0.glb",
    price: 300,
    icon: "🍞",
    label: "Toasted Bread",
  },
  butter: {
    src: BASE_URL + "Melted_Butter_Butter_0.glb",
    price: 200,
    icon: "🧈",
    label: "Melted Butter",
  },
  egg: {
    src: BASE_URL + "Egg_Slice_Egg_0.glb",
    price: 300,
    icon: "🍳",
    label: "Fried Egg",
  },
  bacon: {
    src: BASE_URL + "Bacon_Slice_Bacon_0.glb",
    price: 700,
    icon: "🥓",
    label: "Crispy Bacon",
  },
  sausage: {
    src: BASE_URL + "Sausage_Slice_Sausage_0.glb",
    price: 700,
    icon: "🌭",
    label: "Breakfast Sausage",
  },
  ham: {
    src: BASE_URL + "Ham_Slice_Ham_0.glb",
    price: 800,
    icon: "🍖",
    label: "Smoked Ham",
  },
  cheese: {
    src: BASE_URL + "Cheese_Slice_Cheese_0.glb",
    price: 500,
    icon: "🧀",
    label: "Cheddar",
  },
  halloumi: {
    src: BASE_URL + "Halloumi_Slice_Halloumi_0.glb",
    price: 900,
    icon: "🫓",
    label: "Grilled Halloumi",
  },
  avocado: {
    src: BASE_URL + "Avocado_Slice_Avocado_0.glb",
    price: 900,
    icon: "🥑",
    label: "Avocado",
  },
  salmon: {
    src: BASE_URL + "Salmon_Slice_Salmon_0.glb",
    price: 1200,
    icon: "🐟",
    label: "Smoked Salmon",
  },
  waffle: {
    src: BASE_URL + "Waffle_Slice_Waffle_0.glb",
    price: 600,
    icon: "🧇",
    label: "Waffle",
  },
  lettuce: {
    src: BASE_URL + "Lettuce_Slice_Lettuce_0.glb",
    price: 100,
    icon: "🥬",
    label: "Lettuce",
  },
  tomato: {
    src: BASE_URL + "Tomato_Slice_Tomato_0.glb",
    price: 500,
    icon: "🍅",
    label: "Tomato",
  },
  onion: {
    src: BASE_URL + "Onion_Slice_Onion_0.glb",
    price: 500,
    icon: "🧅",
    label: "Red Onion",
  },
  mushroom: {
    src: BASE_URL + "Mushroom_Slice_Mushroom_0.glb",
    price: 700,
    icon: "🍄",
    label: "Sautéed Mushroom",
  },
  olive: {
    src: BASE_URL + "Olive_Slice_Oilives_0.glb",
    price: 1000,
    icon: "🫒",
    label: "Olives",
  },
  pickle: {
    src: BASE_URL + "Pickle_Slice_Pickles_0.glb",
    price: 400,
    icon: "🥒",
    label: "Pickles",
  },
  chicken: {
    src: BASE_URL + "Chicken_Slice_Chicken_0.glb",
    price: 1000,
    icon: "🍗",
    label: "Grilled Chicken",
  },
  salami: {
    src: BASE_URL + "Salami_Slice_Salami_0.glb",
    price: 1000,
    icon: "🥩",
    label: "Salami",
  },
  patty: {
    src: BASE_URL + "Patty_Slice_Patty_0.glb",
    price: 1000,
    icon: "🍔",
    label: "Beef Patty",
  },
};

Object.keys(INGREDIENTS).forEach((ingredient) => {
  useGLTF.preload(INGREDIENTS[ingredient].src);
});

const getDefaultState = () => ({
  ingredients: [
    { id: 0, name: "bread" },
    { id: 1, name: "bread" },
  ],
  total: INGREDIENTS["bread"].price * 2,
  addedToCart: false,
});

const getInitialState = () => {
  const defaults = getDefaultState();
  const storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
  if (!storedIngredients) return defaults;

  return {
    ...defaults,
    ingredients: storedIngredients,
    total: storedIngredients.reduce(
      (acc, ing) => acc + (INGREDIENTS[ing.name]?.price || 0),
      0
    ),
  };
};

export const useSandwich = create((set) => ({
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

  resetIngredients: () =>
    set(() => {
      const defaults = getDefaultState();
      localStorage.setItem("ingredients", JSON.stringify(defaults.ingredients));
      localStorage.setItem("total", JSON.stringify(defaults.total));
      return defaults;
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

  // Load ingredients from a cart item for editing
  loadIngredients: (items) =>
    set(() => {
      const ingredients = items.map((item, index) => ({
        id: index,
        name: item.name,
      }));
      const total = ingredients.reduce(
        (acc, ing) => acc + (INGREDIENTS[ing.name]?.price || 0),
        0
      );

      localStorage.setItem("ingredients", JSON.stringify(ingredients));
      localStorage.setItem("total", JSON.stringify(total));

      return {
        ingredients,
        total,
        addedToCart: false,
      };
    }),
}));
