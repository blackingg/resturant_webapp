import axios from "axios";

const BASE_URL = "https://api.spoonacular.com/recipes";

const spoonacularService = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

export const getPizzaRecipes = async () => {
  try {
    const response = await spoonacularService.get("/complexSearch", {
      params: {
        query: "pizza",
        number: 25,
      },
    });
    const data = response.data;
    localStorage.setItem("pizzaRecipes", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching pizza recipes:", error);
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
