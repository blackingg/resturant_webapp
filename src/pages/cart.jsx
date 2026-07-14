import { FaTimes, FaEdit, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { IoFastFood, IoCafe } from "react-icons/io5";
import useStore from "../hooks/useStore";
import { useSandwich, INGREDIENTS } from "../hooks/useSandwich";
import { useDrinks, DRINKS } from "../hooks/useDrinks";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const Cart = ({ onEditItem }) => {
  const openCart = useStore((state) => state.openCart);
  const setOpenCart = useStore((state) => state.setOpenCart);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const updateCartItemQuantity = useStore(
    (state) => state.updateCartItemQuantity
  );
  const removeCartItem = useStore((state) => state.removeCartItem);
  const setEditingItem = useStore((state) => state.setEditingItem);

  const loadIngredients = useSandwich((state) => state.loadIngredients);
  const loadDrink = useDrinks((state) => state.loadDrink);

  const [orderClick, setOrderClick] = useState(false);

  useEffect(() => {
    if (!orderClick) return;

    const colors = ["#D97706", "#F97316", "#FFB240", "#2A1A0E", "#5C4A3C"];
    // One big burst, then sustained streams from both sides
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      zIndex: 120,
    });

    const end = Date.now() + 2000;
    let frameId;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        zIndex: 120,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        zIndex: 120,
      });
      if (Date.now() < end) frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(frameId);
  }, [orderClick]);

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
    setOrderClick(false);
  };

  const handleQuantityChange = (index, delta) => {
    const currentQuantity = cartItems[index]?.quantity || 1;
    const newQuantity = Math.max(1, currentQuantity + delta);
    updateCartItemQuantity(index, newQuantity);
  };

  const handleEditItem = (index) => {
    const item = cartItems[index];
    setEditingItem(index);

    if (item.type === "Sandwich") {
      // Load the sandwich ingredients into the assembler
      loadIngredients(item.items);
      if (onEditItem) onEditItem("Sandwiches");
    } else if (item.type === "Drink") {
      // Load the drink into the assembler
      if (item.items && item.items[0]) {
        loadDrink(item.items[0]);
      }
      if (onEditItem) onEditItem("Drinks");
    }

    // Close the cart to go back to the assembler
    setOpenCart(false);
  };

  const handleRemoveItem = (index) => {
    removeCartItem(index);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.total || 0) * item.quantity,
      0
    );
  };

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const getIngredientEmoji = (name) => {
    return INGREDIENTS[name]?.icon || "🥪";
  };

  const getDrinkEmoji = (name) => {
    return DRINKS[name]?.icon || "🧃";
  };

  const capitalize = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const getItemLabel = (type, name) => {
    const source = type === "Sandwich" ? INGREDIENTS : DRINKS;
    return source[name]?.label || capitalize(name);
  };

  return (
    <>
      <AnimatePresence>
        {openCart && !orderClick && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-brand-milk"
          >
            <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-sand shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-brand-espresso">
                    Your Breakfast Tray
                  </h2>
                  <p className="text-sm text-brand-mocha">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"} waiting for you
                  </p>
                </div>
                <button
                  onClick={handleCartClose}
                  className="p-3 rounded-md bg-brand-cream hover:bg-brand-butter transition-all duration-200 group"
                >
                  <FaTimes className="text-brand-mocha group-hover:text-brand-amber-dark transition-colors" />
                </button>
              </div>
            </div>

            <div className="pt-28 pb-48 px-4 md:px-8 overflow-y-auto h-full">
              <div className="max-w-4xl mx-auto">
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-md shadow-sm border border-brand-sand overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        {/* Item Header */}
                        <div className="flex items-center justify-between p-4 bg-brand-cream border-b border-brand-sand">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md shadow-sm">
                              {item.type === "Sandwich" ? (
                                <IoFastFood className="text-brand-amber text-xl" />
                              ) : (
                                <IoCafe className="text-brand-amber text-xl" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-display font-semibold text-brand-espresso text-lg">
                                {item.type === "Sandwich"
                                  ? "Breakfast Sandwich"
                                  : "Morning Drink"}
                              </h3>
                              <p className="text-brand-mocha text-sm">
                                ₦{(item.total || 0).toLocaleString()} each
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-brand-espresso font-bold text-xl">
                              ₦
                              {(
                                (item.total || 0) * item.quantity
                              ).toLocaleString()}
                            </p>
                            <p className="text-brand-mocha text-xs">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.items && item.items.length > 0 ? (
                              item.items.map((ingredient, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-cream/70 border border-brand-sand rounded-full text-sm font-medium text-brand-mocha hover:scale-105 transition-transform"
                                >
                                  <span>
                                    {item.type === "Sandwich"
                                      ? getIngredientEmoji(ingredient.name)
                                      : getDrinkEmoji(ingredient.name)}
                                  </span>
                                  <span>
                                    {getItemLabel(item.type, ingredient.name)}
                                  </span>
                                </span>
                              ))
                            ) : (
                              <span className="text-brand-mocha/50 text-sm italic">
                                No ingredients
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-brand-sand/50">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleQuantityChange(index, -1)}
                                disabled={item.quantity <= 1}
                                className="p-2 rounded-md bg-brand-cream hover:bg-brand-butter disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                              >
                                <FaMinus className="text-brand-mocha text-xs" />
                              </button>
                              <span className="font-bold text-brand-espresso min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(index, 1)}
                                className="p-2 rounded-md bg-brand-cream hover:bg-brand-butter transition-colors"
                              >
                                <FaPlus className="text-brand-mocha text-xs" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditItem(index)}
                                className="flex items-center gap-2 px-4 py-2 bg-brand-espresso text-brand-cream rounded-md font-medium hover:bg-black transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                              >
                                <FaEdit className="text-sm" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleRemoveItem(index)}
                                className="p-2 rounded-md bg-red-100 hover:bg-red-200 transition-colors group"
                              >
                                <FaTrash className="text-red-500 group-hover:text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    <div className="w-32 h-32 bg-gradient-to-br from-brand-cream to-brand-butter rounded-full flex items-center justify-center mb-6">
                      <IoFastFood className="text-6xl text-brand-amber/50" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-brand-espresso mb-2">
                      Your tray is empty
                    </h3>
                    <p className="text-brand-mocha text-center max-w-xs">
                      Stack up a fresh morning sandwich and pour yourself
                      something cold — your breakfast starts here.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-sand shadow-2xl"
              >
                <div className="max-w-4xl mx-auto px-6 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-brand-mocha">
                        Total · {totalQuantity}{" "}
                        {totalQuantity === 1 ? "item" : "items"}
                      </p>
                      <p className="font-display text-3xl font-bold text-brand-espresso">
                        ₦{calculateTotal().toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={handleClearCart}
                      className="px-4 py-2 text-red-500 border border-red-200 hover:bg-red-50 rounded-md transition-colors font-medium text-sm"
                    >
                      Clear All
                    </button>
                  </div>
                  <button
                    onClick={handleOrderClick}
                    className="w-full py-4 bg-gradient-to-r from-brand-amber to-orange-500 text-white rounded-md font-bold text-lg hover:from-brand-amber-dark hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {orderClick && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-brand-cream"
          >
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-8 ring-8 ring-brand-amber/10 shadow-lg"
              >
                <span className="text-5xl md:text-6xl">🥐</span>
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block text-[11px] md:text-xs font-bold uppercase tracking-widest text-brand-amber-dark bg-brand-amber/10 px-3.5 py-1.5 rounded-md mb-4"
              >
                Order Confirmed
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-3xl md:text-5xl font-bold text-brand-espresso mb-4"
              >
                Enjoy Your Morning!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-brand-mocha text-base md:text-lg max-w-md mb-10"
              >
                Your breakfast will be ready in about 5 minutes — The Breakfast
                Place will deliver it straight to your address.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={cancelOrder}
                className="px-10 py-3 bg-brand-amber hover:bg-brand-amber-dark text-white rounded-md font-bold active:scale-95 transition-all shadow-lg"
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
