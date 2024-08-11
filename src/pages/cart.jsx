import { FaTimes } from "react-icons/fa";
import useStore from "../hooks/useStore";
import { QuantityInput } from "../components/quantityInput";
import { useEffect, useState } from "react";

export const Cart = () => {
  const openCart = useStore((state) => state.openCart);
  const setOpenCart = useStore((state) => state.setOpenCart);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const updateCartItemQuantity = useStore(
    (state) => state.updateCartItemQuantity
  );

  const [orderClick, setOrderClick] = useState(false);

  useEffect(() => {
    console.log("cartItems:", cartItems);
  }, [cartItems]);

  const handleCartClose = () => {
    setOpenCart(!openCart);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleOrderClick = () => {
    setOrderClick(true);
  };

  const cancelOrder = () => {
    clearCart();
    handleCartClose();
  };

  const handleQuantityChange = (index, quantity) => {
    updateCartItemQuantity(index, quantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.total || 0) * item.quantity,
      0
    );
  };

  return (
    <>
      {openCart && !orderClick && (
        <div className="absolute h-screen w-screen z-40 bg-white">
          <div
            onClick={handleCartClose}
            className="fixed top-24 right-6 md:right-12 z-40 p-3 rounded-md bg-gray-700 cursor-pointer"
          >
            <FaTimes color="#ffa500" />
          </div>

          <div className="bg-white min-h-screen overflow-y-scroll px-12 lg:px-24 pt-32 pb-14">
            <h3 className="text-xl font-bold">
              Total - ₦{calculateTotal().toFixed(2)}
            </h3>
            <div className="mt-5 h-[50%] flex flex-col lg:grid grid-cols-3 grid-rows-3 gap-5">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4"
                  >
                    <h4 className="font-semibold">
                      {item.type} - ₦{(item.total || 0).toFixed(2)}
                    </h4>
                    <p className="text-gray-600">
                      {item.items && item.items.length > 0 ? (
                        item.items.map((ingredient, idx) => (
                          <span key={idx}>
                            {ingredient.name}
                            {idx < item.items.length - 1 ? ", " : ""}
                          </span>
                        ))
                      ) : (
                        <span>No ingredients</span>
                      )}
                    </p>
                    <QuantityInput
                      initialQuantity={item.quantity}
                      onQuantityChange={(quantity) =>
                        handleQuantityChange(index, quantity)
                      }
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Your cart is empty</p>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="flex justify-left space-x-7 mt-6">
                <button
                  className="text-white bg-red-400 py-2 px-4 rounded-lg font-bold hover:bg-red-700"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="text-white bg-purple-600 py-2 px-4 rounded-lg font-bold hover:bg-purple-700"
                  onClick={handleOrderClick}
                >
                  Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {orderClick && (
        <div className="absolute h-screen w-screen z-40 bg-[#ffa500]">
          <div
            onClick={handleCartClose}
            className="fixed top-24 right-6 md:right-12 z-40 p-3 rounded-md bg-gray-700 cursor-pointer"
          >
            <FaTimes color="#ffa500" />
          </div>
          <div className="bg-white overflow-scroll px-12 lg:px-24 py-40 md:py-32 h-screen w-screen">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <p className="mt-1">
              Order sent successfully, it will be ready in 5 minutes! The
              Breakfast Place will directly deliver it to your address
            </p>
            <button
              className="text-white bg-red-600 mt-5 py-2 px-4 rounded-lg font-bold hover:bg-red-700"
              onClick={cancelOrder}
            >
              Cancel order
            </button>
          </div>
        </div>
      )}
    </>
  );
};
