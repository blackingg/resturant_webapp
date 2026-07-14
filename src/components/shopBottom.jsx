import { INGREDIENTS, useSandwich } from "../hooks/useSandwich";
import { DRINKS, useDrinks } from "../hooks/useDrinks";
import { FaShoppingCart, FaTimes, FaCheck, FaEdit } from "react-icons/fa";
import useStore from "../hooks/useStore";
import { useState } from "react";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ShopBottom({
  selectedType,
  storedSelectedDrink,
  storedSelectedMeal,
}) {
  const addIngredient = useSandwich((state) => state.addIngredient);
  const setDrink = useDrinks((state) => state.setDrink);
  const [addedToCartSandwich, setAddedToCartSandwich] = useSandwich((state) => [
    state.addedToCart,
    state.setAddedToCart,
  ]);

  const resetIngredients = useSandwich((state) => state.resetIngredients);
  const [addedToCartDrink, setAddedToCartDrink] = useDrinks((state) => [
    state.addedToCart,
    state.setAddedToCart,
  ]);
  const sandwichTotal = useSandwich((state) => state.total);
  const drinkTotal = useDrinks((state) => state.total);
  const total = selectedType === "Sandwiches" ? sandwichTotal : drinkTotal;

  const addCartItem = useStore((state) => state.addCartItem);
  const editingItemIndex = useStore((state) => state.editingItemIndex);
  const updateCartItem = useStore((state) => state.updateCartItem);
  const clearEditingItem = useStore((state) => state.clearEditingItem);

  const [showPopup, setShowPopup] = useState(false);

  const isEditing = editingItemIndex !== null;

  const handleAddToCart = () => {
    if (selectedType === "Sandwiches") {
      if (isEditing) {
        updateCartItem(editingItemIndex, {
          type: "Sandwich",
          items: storedSelectedMeal,
          total: sandwichTotal,
        });
      } else {
        setAddedToCartSandwich(true);
        addCartItem({
          type: "Sandwich",
          items: storedSelectedMeal,
          total: sandwichTotal,
        });
      }
    } else if (selectedType === "Drinks") {
      if (isEditing) {
        updateCartItem(editingItemIndex, {
          type: "Drink",
          items: [storedSelectedDrink],
          total: drinkTotal,
        });
      } else {
        setAddedToCartDrink(true);
        addCartItem({
          type: "Drink",
          items: [storedSelectedDrink],
          total: drinkTotal,
        });
      }
    }
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      resetIngredients();
    }, 2300);
  };

  const handleCancelEdit = () => {
    clearEditingItem();
    resetIngredients();
  };

  const cancelOrder = () => {
    if (selectedType === "Sandwiches") {
      setAddedToCartSandwich(false);
    } else if (selectedType === "Drinks") {
      setAddedToCartDrink(false);
    }
  };

  const addedToCart =
    selectedType === "Sandwiches" ? addedToCartSandwich : addedToCartDrink;

  const isSandwiches = selectedType === "Sandwiches";

  return (
    <div className="max-w-3xl mx-auto">
      {isEditing && (
        <div className="w-full flex items-center justify-center">
          <div className="w-fit mt-2 mb-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-brand-butter border border-brand-sand rounded-full">
            <FaEdit className="text-brand-amber-dark text-xs md:text-base flex-shrink-0" />
            <span className="text-brand-espresso font-medium text-xs md:text-sm">
              <span className="md:hidden">Editing item</span>
              <span className="hidden md:inline">
                Editing — make your changes and save
              </span>
            </span>
            <button
              onClick={handleCancelEdit}
              className="ml-1 md:ml-2 px-3 py-1 md:py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-wide bg-brand-espresso text-brand-cream rounded-md hover:bg-black active:scale-95 transition-all shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-3 mb-2">
        <div className="flex overflow-x-auto pb-2 gap-2 max-w-full">
          {isSandwiches
            ? Object.keys(INGREDIENTS).map((ingredient) => (
                <button
                  key={ingredient}
                  className="flex flex-col items-center justify-center flex-shrink-0 min-h-24 h-fit px-4 pt-4 pb-2 rounded-md border border-brand-sand bg-brand-cream/60 cursor-pointer hover:bg-brand-butter hover:border-brand-amber hover:-translate-y-0.5 transition-all"
                  onClick={() => addIngredient(ingredient)}
                >
                  <span className="text-2xl block mb-1">
                    {INGREDIENTS[ingredient].icon}
                  </span>
                  <span className="text-xs font-semibold text-brand-espresso whitespace-nowrap">
                    {INGREDIENTS[ingredient].label ||
                      capitalizeFirstLetter(ingredient)}
                  </span>
                  <span className="text-xs block text-brand-amber-dark font-bold">
                    ₦{INGREDIENTS[ingredient].price.toLocaleString()}
                  </span>
                </button>
              ))
            : Object.keys(DRINKS).map((drink) => (
                <button
                  key={drink}
                  className="flex flex-col items-center justify-center flex-shrink-0 min-h-24 h-fit px-4 pt-4 pb-2 rounded-md border border-brand-sand bg-brand-cream/60 cursor-pointer hover:bg-brand-butter hover:border-brand-amber hover:-translate-y-0.5 transition-all"
                  onClick={() => setDrink(drink)}
                >
                  <span className="text-2xl block mb-1">
                    {DRINKS[drink].icon}
                  </span>
                  <span className="text-xs font-semibold text-brand-espresso whitespace-nowrap">
                    {DRINKS[drink].label || capitalizeFirstLetter(drink)}
                  </span>
                  <span className="text-xs block text-brand-amber-dark font-bold">
                    ₦{DRINKS[drink].price.toLocaleString()}
                  </span>
                </button>
              ))}
        </div>
      </div>

      <button
        className={`text-white py-3 px-4 rounded-md font-bold w-full flex justify-center items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.01] ${
          showPopup ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        } bg-gradient-to-r from-brand-amber to-orange-500 hover:from-brand-amber-dark hover:to-orange-600`}
        onClick={handleAddToCart}
        disabled={showPopup}
      >
        {isEditing ? (
          <>
            <FaCheck />
            <span>Save Changes · ₦{total.toLocaleString()}</span>
          </>
        ) : (
          <>
            <FaShoppingCart />
            <span>Add to Cart · ₦{total.toLocaleString()}</span>
          </>
        )}
      </button>

      {showPopup && (
        <div className="fixed z-50 w-max max-w-[90vw] flex justify-center items-center gap-1.5 md:gap-2 bottom-96 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white pl-3 pr-2 py-1.5 md:pl-4 md:py-2 rounded-full shadow-lg">
          <span className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center bg-white/20 rounded-full text-xs md:text-sm">
            ✓
          </span>
          <span className="font-medium text-xs md:text-sm whitespace-nowrap">
            {isEditing ? "Item updated!" : "Added to your tray!"}
          </span>
          <button
            onClick={cancelOrder}
            aria-label="Dismiss"
            className="ml-1 md:ml-2 p-1.5 hover:bg-white/20 active:scale-95 rounded-full transition-all"
          >
            <FaTimes size={12} />
          </button>
        </div>
      )}
    </div>
  );
}