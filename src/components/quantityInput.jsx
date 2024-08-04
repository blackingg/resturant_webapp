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
      onQuantityChange(quantity);
    } else if (value < minQuantity) {
      setQuantity(minQuantity);
      onQuantityChange(minQuantity);
    } else if (value > maxQuantity) {
      setQuantity(maxQuantity);
      onQuantityChange(maxQuantity);
    }
  };

  return (
    <div className="flex items-center mt-2">
      <button
        onClick={handleReduce}
        className="bg-[#ffa500] p-2 rounded-l-lg"
        disabled={quantity <= minQuantity}
      >
        <FaMinus />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={minQuantity}
        max={maxQuantity}
        className="text-black text-center"
      />
      <button
        onClick={handleIncrease}
        className="bg-[#ffa500] p-2 rounded-r-lg"
        disabled={quantity >= maxQuantity}
      >
        <FaPlus />
      </button>
    </div>
  );
};
