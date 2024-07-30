import axios from "axios";

const BASE_URL = "https://api.spoonacular.com/recipes";

const spoonacularService = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_API_KEY,
  },
});

export const getBreakfastRecipes = async () => {
  try {
    const response = await spoonacularService.get("/complexSearch", {
      params: {
        query: "breakfast",
        number: 25,
      },
    });
    const data = response.data;
    localStorage.setItem("breakfastRecipes", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching breakfast recipes:", error);
    throw error;
  }
};

export const getRecipeDetailsById = async (id) => {
  try {
    const response = await spoonacularService.get(`/${id}/information`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};
