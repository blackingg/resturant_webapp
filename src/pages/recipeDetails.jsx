import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeDetailsById } from "../context/recipiesData";
import { LoadingScreen } from "./loadingScreen";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState({});

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
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : recipe ? (
        <div className="bg-brand-milk w-full min-h-screen pt-28 pb-24 px-5 md:px-8">
          <article className="max-w-3xl mx-auto">
            {/* Back link */}
            <button
              onClick={handleBackClick}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-mocha hover:text-brand-amber transition-colors mb-8"
            >
              <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              All Recipes
            </button>

            {/* Header */}
            <header className="mb-8">
              {recipe.dishTypes?.length > 0 && (
                <p className="text-xs font-bold uppercase tracking-widest text-brand-amber mb-3">
                  {recipe.dishTypes.slice(0, 2).join(" · ")}
                </p>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-espresso tracking-tight leading-tight mb-4">
                {recipe.title}
              </h1>
              <p className="text-sm text-brand-mocha">
                {recipe.sourceName && (
                  <>
                    By{" "}
                    <span className="font-semibold text-brand-espresso">
                      {recipe.sourceName}
                    </span>
                  </>
                )}
                {recipe.readyInMinutes && (
                  <> · {recipe.readyInMinutes} minutes</>
                )}
                {recipe.servings && <> · Serves {recipe.servings}</>}
                {recipe.vegetarian && <> · 🌿 Vegetarian</>}
              </p>
            </header>

            {/* Hero image */}
            <figure className="mb-10">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full rounded-md border border-brand-sand/60"
              />
              {recipe.creditsText && (
                <figcaption className="mt-2 text-xs text-brand-mocha/60 italic">
                  Photo: {recipe.creditsText}
                </figcaption>
              )}
            </figure>

            {/* Ingredients */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-brand-espresso mb-2">
                Ingredients
              </h2>
              <p className="text-sm text-brand-mocha/70 mb-4">
                Tick things off as you gather them.
              </p>
              <ul className="divide-y divide-brand-sand/50 border-y border-brand-sand/50">
                {recipe.extendedIngredients.map((ingredient, index) => {
                  const isChecked = !!checkedIngredients[index];
                  return (
                    <li key={`${ingredient.id}-${index}`}>
                      <label
                        className={`flex items-start gap-3 py-3 cursor-pointer transition-colors duration-200 ${
                          isChecked
                            ? "text-brand-mocha/40 line-through"
                            : "text-brand-espresso"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleIngredient(index)}
                          className="mt-1 cursor-pointer accent-brand-amber h-4 w-4"
                        />
                        <span className="text-base leading-relaxed">
                          {ingredient.original}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-brand-espresso mb-6">
                Method
              </h2>
              {recipe.analyzedInstructions?.length > 0 ? (
                <div className="space-y-10">
                  {recipe.analyzedInstructions.map((section, sectionIdx) => (
                    <div key={sectionIdx}>
                      {section.name && (
                        <h3 className="font-display text-lg font-semibold text-brand-espresso mb-4">
                          {section.name}
                        </h3>
                      )}
                      <ol className="space-y-8">
                        {section.steps.map((step) => (
                          <li key={step.number}>
                            <div className="flex items-baseline gap-4">
                              <span className="font-display text-3xl font-bold text-brand-amber leading-none flex-shrink-0">
                                {step.number}
                              </span>
                              <div className="min-w-0 border-l border-brand-sand/60 pl-4">
                                <p className="text-brand-mocha text-base leading-relaxed">
                                  {step.step}
                                </p>
                                {step.length && (
                                  <p className="mt-2 text-sm italic text-brand-mocha/60">
                                    About {step.length.number}{" "}
                                    {step.length.unit}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="prose prose-amber max-w-none text-brand-mocha text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              )}
            </section>

            {/* Footer */}
            <footer className="mt-14 pt-6 border-t border-brand-sand/50 flex items-center justify-between">
              <p className="text-sm text-brand-mocha/60 italic">
                Enjoy your breakfast ☕
              </p>
              <button
                onClick={handleBackClick}
                className="text-sm font-semibold text-brand-amber hover:text-brand-amber-dark transition-colors"
              >
                ← Back to all recipes
              </button>
            </footer>
          </article>
        </div>
      ) : (
        <div className="h-screen w-screen bg-brand-milk flex flex-col items-center justify-center gap-5 p-6 text-center">
          <span className="text-5xl">🥞</span>
          <h1 className="font-display text-3xl font-bold text-brand-espresso">
            Recipe Not Found
          </h1>
          <p className="text-brand-mocha font-medium max-w-md">
            We couldn't load the details for this recipe. It might have been removed or the service is temporarily offline.
          </p>
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-brand-amber hover:bg-brand-amber-dark text-white transition-all duration-300 font-semibold shadow-md shadow-brand-amber/15 hover:shadow-none"
          >
            ← Return to Recipes
          </button>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
