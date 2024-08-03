import { useEffect, useState } from "react";
import { INGREDIENTS, useSandwich, DRINKS, useDrinks } from "../hooks/meals";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ShopBottom({ selectedType }) {
  const addIngredient = useSandwich((state) => state.addIngredient);
  const setDrink = useDrinks((state) => state.setDrink);
  const [addedToCartSandwich, setAddedToCartSandwich] = useSandwich((state) => [
    state.addedToCart,
    state.setAddedToCart,
  ]);
  const [addedToCartDrink, setAddedToCartDrink] = useDrinks((state) => [
    state.addedToCart,
    state.setAddedToCart,
  ]);
  const sandwichTotal = useSandwich((state) => state.total);
  const drinkTotal = useDrinks((state) => state.total);
  const total = selectedType === "Sandwiches" ? sandwichTotal : drinkTotal;

  const handleAddToCart = () => {
    if (selectedType === "Sandwiches") {
      setAddedToCartSandwich(true);
    } else if (selectedType === "Drinks") {
      setAddedToCartDrink(true);
    }
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
  useEffect(() => {
    console.log("sandwichTotal:", sandwichTotal);
    console.log("drinkTotal:", drinkTotal);

    console.log("addedToCartSandwich:", addedToCartSandwich);
    console.log("addedToCartDrink:", addedToCartDrink);
  });
  return (
    <div className="fixed bottom-0 px-5 py-2 left-0 right-0 bg-white shadow-md">
      <div className="p-3 shadow-md">
        {addedToCart ? (
          <div>
            <h3 className="text-lg font-bold">Total - ${total.toFixed(2)}</h3>
            <p className="text-gray-600 mt-1 mb-4">
              Your total order is ${sandwichTotal + drinkTotal}.<br />
              Order sent successfully, it will be ready in 5 minutes! The
              Breakfast Place will directly deliver it to your address
            </p>
            <button
              className="text-white bg-purple-600 py-2 px-4 rounded-lg font-bold hover:bg-purple-700"
              onClick={cancelOrder}
            >
              Cancel order
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl text-center font-bold">{selectedType}</h2>
            <br />
            <h3 className="text-lg font-bold text-center">
              Your Creation (${total.toFixed(2)})
            </h3>
            <p className="text-center text-gray-600">
              Compose your {selectedType.toLowerCase()} by adding{" "}
              {selectedType === "Sandwiches" ? "ingredients" : "drinks"}
            </p>
            <div className="flex overflow-x-scroll mt-2 mb-2 space-x-2">
              {selectedType === "Sandwiches"
                ? Object.keys(INGREDIENTS).map((ingredient) => (
                    <div
                      key={ingredient}
                      className="p-2"
                    >
                      <button
                        className="py-2 px-4 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100"
                        onClick={() => addIngredient(ingredient)}
                      >
                        {INGREDIENTS[ingredient].icon +
                          ` ${capitalizeFirstLetter(
                            ingredient
                          )} (+$${INGREDIENTS[ingredient].price.toFixed(2)})`}
                      </button>
                    </div>
                  ))
                : Object.keys(DRINKS).map((drink) => (
                    <div
                      key={drink}
                      className="p-2"
                    >
                      <button
                        className="py-2 px-4 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100"
                        onClick={() => setDrink(drink)}
                      >
                        {DRINKS[drink].icon +
                          ` ${capitalizeFirstLetter(drink)} (+$${DRINKS[
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
              Add to cart (${total.toFixed(2)}) <FaShoppingCart />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
