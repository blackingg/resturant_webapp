import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export const QuantityInput = ({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 7,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
      onQuantityChange(quantity + 1);
    }
  };

  const handleReduce = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minQuantity && value <= maxQuantity) {
      setQuantity(value);
      onQuantityChange(value);
    } else if (value < minQuantity) {
      setQuantity(minQuantity);
      onQuantityChange(minQuantity);
    } else if (value > maxQuantity) {
      setQuantity(maxQuantity);
      onQuantityChange(maxQuantity);
    }
  };

  return (
    <div className="inline-flex items-center mt-2 rounded-md border border-brand-sand bg-white overflow-hidden">
      <button
        onClick={handleReduce}
        aria-label="Decrease quantity"
        className="p-2 text-brand-espresso hover:bg-brand-cream transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        disabled={quantity <= minQuantity}
      >
        <FaMinus size={12} />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={minQuantity}
        max={maxQuantity}
        className="w-10 bg-transparent text-brand-espresso font-semibold text-center focus:outline-none"
      />
      <button
        onClick={handleIncrease}
        aria-label="Increase quantity"
        className="p-2 text-brand-espresso hover:bg-brand-cream transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        disabled={quantity >= maxQuantity}
      >
        <FaPlus size={12} />
      </button>
    </div>
  );
};
