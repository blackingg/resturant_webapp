import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBreakfastRecipes } from "../recipiesData.jsx";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const storedRecipes = localStorage.getItem("breakfastRecipes".results);
        if (storedRecipes) {
          const parsedRecipes = JSON.parse(storedRecipes);
          setRecipes(parsedRecipes.results);
          console.log(parsedRecipes.results);
        } else {
          const data = await getBreakfastRecipes();
          setRecipes(data.results);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <div className=" bg-gray-100 w-full h-full p-4 px-7 md:px-16 pt-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#6F4E37]">
        Breakfast Recipes
      </h1>
      {loading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <div className=" loading-icon "></div>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="block bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2 text-[#333]">
                  {recipe.title}
                </h2>
                <span className="text-[#6F4E37] font-semibold hover:underline">
                  View Recipe
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
