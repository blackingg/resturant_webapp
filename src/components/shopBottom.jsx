import { INGREDIENTS, useSandwich } from "../hooks/useSandwich";
import { DRINKS, useDrinks } from "../hooks/useDrinks";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
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

  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    if (selectedType === "Sandwiches") {
      setAddedToCartSandwich(true);
      addCartItem({
        type: "Sandwich",
        items: storedSelectedMeal,
        total: sandwichTotal,
      });
    } else if (selectedType === "Drinks") {
      setAddedToCartDrink(true);
      addCartItem({
        type: "Drink",
        items: [storedSelectedDrink],
        total: drinkTotal,
      });
    }
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      resetIngredients();
    }, 2300);
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

  return (
    <div className="fixed bottom-0 px-5 py-2 left-0 right-0 bg-white shadow-md">
      <div className="p-3 shadow-md">
        <>
          <h2 className="text-2xl text-center font-bold">{selectedType}</h2>
          <br />
          <h3 className="text-lg font-bold text-center">
            Your Creation (₦{total})
          </h3>
          <p className="text-center text-gray-600">
            Compose your {selectedType.toLowerCase()} by adding{" "}
            {selectedType === "Sandwiches" ? "ingredients" : "drinks"}
          </p>
          <div className="flex overflow-x-scroll mt-2 mb-2 pb-2 space-x-2">
            {selectedType === "Sandwiches"
              ? Object.keys(INGREDIENTS).map((ingredient) => (
                  <div
                    key={ingredient}
                    className="p-2"
                  >
                    <button
                      className="py-auto min-h-24 h-fit px-4 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100"
                      onClick={() => addIngredient(ingredient)}
                    >
                      {INGREDIENTS[ingredient].icon +
                        ` ${capitalizeFirstLetter(ingredient)} (₦${INGREDIENTS[
                          ingredient
                        ].price.toFixed(2)})`}
                    </button>
                  </div>
                ))
              : Object.keys(DRINKS).map((drink) => (
                  <div
                    key={drink}
                    className="p-2"
                  >
                    <button
                      className="py-auto min-h-16 h-fit px-4 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100"
                      onClick={() => setDrink(drink)}
                    >
                      {DRINKS[drink].icon +
                        ` ${capitalizeFirstLetter(drink)} (₦${DRINKS[
                          drink
                        ].price.toFixed(2)})`}
                    </button>
                  </div>
                ))}
          </div>
          <button
            className="text-white bg-purple-600 py-2 px-4 rounded-lg font-bold mt-4 w-full hover:bg-purple-700 flex justify-center items-center space-x-2"
            onClick={handleAddToCart}
          >
            Add to cart (₦{total}) <FaShoppingCart />
          </button>
          {showPopup && (
            <div className="fixed w-auto flex justify-center items-center gap-2 bottom-96 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md">
              Item added to cart!
              <FaTimes
                size={20}
                color="#ffa500"
                className=""
                onClick={cancelOrder}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
}
