import React from "react";
import { RiDrinksFill } from "react-icons/ri";
import { LuSandwich } from "react-icons/lu";

const Sidebar = ({ selectedType, setSelectedType }) => {
  const types = [
    { id: "1", name: "Sandwiches", icon: LuSandwich },
    { id: "2", name: "Drinks", icon: RiDrinksFill },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-md bg-white border border-brand-sand shadow-lg">
      {types.map((type) => {
        const isActive = selectedType === type.name;
        return (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.name)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 rounded-md text-xs md:text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-brand-espresso text-brand-cream shadow-md"
                : "text-brand-mocha hover:bg-brand-cream active:scale-95"
            }`}
          >
            <type.icon
              className="text-base md:text-lg flex-shrink-0"
              color={isActive ? "#FFB240" : "#5C4A3C"}
            />
            <span>{type.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
