import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBreakfastRecipes } from "../context/recipiesData.jsx";
import LoadingDots from "../components/LoadingDots.jsx";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const storedRecipes = localStorage.getItem("breakfastRecipes");
        if (storedRecipes) {
          const parsedRecipes = JSON.parse(storedRecipes);
          setRecipes(parsedRecipes.results || []);
        } else {
          const data = await getBreakfastRecipes();
          setRecipes(data.results);
          localStorage.setItem("breakfastRecipes", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="bg-brand-milk w-full min-h-screen p-6 px-4 md:px-16 pt-28">
      {/* Premium Culinary Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3 py-1.5 rounded-full mb-3">
          Morning Delights
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-espresso tracking-tight">
          Breakfast Recipes
        </h1>
        <p className="text-brand-mocha mt-3 text-sm md:text-base font-medium leading-relaxed">
          Explore our handpicked collection of fresh breakfast options, crafted to inspire your morning cooking routine.
        </p>
      </div>

      {loading ? (
        <>
          <div className="flex flex-col items-center justify-center mb-10">
            <LoadingDots />
            <p className="mt-4 text-brand-amber font-semibold text-lg animate-pulse">
              Gathering this morning's recipes...
            </p>
          </div>
          <div className="max-w-7xl mx-auto grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-md border border-brand-sand/60 overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] w-full bg-brand-sand/40" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-4/5 rounded-full bg-brand-sand/50" />
                  <div className="h-5 w-3/5 rounded-full bg-brand-sand/40" />
                  <div className="pt-4 border-t border-brand-sand/40">
                    <div className="h-4 w-24 rounded-full bg-brand-amber/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <span className="text-5xl mb-4">🍳</span>
          <h2 className="font-display text-2xl font-semibold text-brand-espresso mb-2">
            The kitchen is quiet right now
          </h2>
          <p className="text-brand-mocha max-w-sm">
            We couldn't load any recipes. Check your connection and refresh the
            page to try again.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group flex flex-col justify-between bg-white rounded-md border border-brand-sand/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(42,26,14,0.06)] overflow-hidden cursor-pointer transition-all duration-500 ease-out"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              {/* Image Container with aspect ratio locked to prevent stretching */}
              <div className="relative overflow-hidden aspect-[4/3] w-full bg-brand-cream/50">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-brand-espresso group-hover:text-brand-amber transition-colors duration-300 line-clamp-2 leading-snug mb-3">
                    {recipe.title}
                  </h2>
                </div>

                {/* Call-to-Action Indicator */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-sand/40">
                  <span className="text-sm text-brand-amber font-bold flex items-center gap-1">
                    View Recipe
                    <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
