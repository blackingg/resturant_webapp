import { useState } from "react";
import { INGREDIENTS, useSandwich } from "../hooks/useSandwich";
import { FaShoppingCart } from "react-icons/fa";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ShopBottom() {
  const addIngredient = useSandwich((state) => state.addIngredient);
  const [addedToCart, setAddedToCart] = useSandwich((state) => [
    state.addedToCart,
    state.setAddedToCart,
  ]);
  const total = useSandwich((state) => state.total);

  return (
    <div className="p-5 bg-white shadow-md">
      {addedToCart ? (
        <div>
          <h3 className="text-lg font-bold">Total - ${total.toFixed(2)}</h3>
          <p className="text-gray-600 mt-1 mb-4">
            Order sent successfully, it will be ready in 5 minutes! The
            Breakfast Place will directly deliver it to your address
          </p>
          <button
            className="text-white bg-purple-600 py-2 px-4 rounded-lg font-bold hover:bg-purple-700"
            onClick={() => setAddedToCart(false)}
          >
            Cancel order
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-2xl font-bold">Sandwiches</h2>
          </div>
          <p className="text-gray-600">
            Fresh and delicious sandwiches made with love
          </p>
          <div className="h-px bg-gray-300 my-5" />
          <h3 className="text-lg font-bold text-center">
            Your Creation ($5.00)
          </h3>
          <p className="text-center text-gray-600">
            Compose your sandwich by adding ingredients
          </p>
          <div className="flex overflow-x-scroll mt-2 mb-2 space-x-2">
            {Object.keys(INGREDIENTS).map((ingredient) => (
              <div
                key={ingredient}
                className="p-2"
              >
                <button
                  className="py-2 px-4 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100"
                  onClick={() => addIngredient(ingredient)}
                >
                  {INGREDIENTS[ingredient].icon +
                    ` ${capitalizeFirstLetter(ingredient)} (+$${INGREDIENTS[
                      ingredient
                    ].price.toFixed(2)})`}
                </button>
              </div>
            ))}
          </div>
          <button
            className="text-white bg-purple-600 py-2 px-4 rounded-lg font-bold mt-4 w-full hover:bg-purple-700 flex justify-center items-center space-x-2"
            onClick={() => setAddedToCart(true)}
          >
            Add to cart (${total.toFixed(2)}) <FaShoppingCart />
          </button>
        </>
      )}
    </div>
  );
}
