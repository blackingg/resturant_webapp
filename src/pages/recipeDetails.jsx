import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetailsById } from "../recipiesData";
import { useNavigate } from "react-router-dom";

import { IoArrowBackCircle } from "react-icons/io5";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/recipes");
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const data = await getRecipeDetailsById(id);
        setRecipe(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
      setLoading(false);
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className=" loading-icon "></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <p className="h-screen w-screen flex items-center justify-center gap-5">
        <h1 className="text-4xl font-bold mb-4 text-[#B22222]">
          Recipe not found{" "}
        </h1>
        <button
          onClick={handleBackClick}
          className="mb-4 text-[#B22222] font-semibold hover:underline"
        >
          <IoArrowBackCircle size={30} />
        </button>
      </p>
    );
  }

  return (
    <div className="bg-gray-100 p-4 px-32 pt-24 pb-16">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4 text-[#B22222]">
          {recipe.title}
        </h1>
        <button
          onClick={handleBackClick}
          className="mb-4 text-[#B22222] font-semibold hover:underline"
        >
          <IoArrowBackCircle size={30} />
        </button>
      </div>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
      <ul className="mb-4 italic list-disc">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-2">Instructions</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
};

export default RecipeDetails;
