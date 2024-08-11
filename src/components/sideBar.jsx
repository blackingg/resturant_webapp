import React from "react";
import { RiDrinksFill } from "react-icons/ri";
import { LuSandwich } from "react-icons/lu";

const Sidebar = ({ selectedType, setSelectedType }) => {
  const types = [
    { id: "1", name: "Sandwiches", icon: LuSandwich },
    { id: "2", name: "Drinks", icon: RiDrinksFill },
  ];

  return (
    <div className="w-fit fixed bottom-[40%] left-1 z-30 flex flex-col h-fit bg-gray-100 text-white">
      {types.map((type) => (
        <button
          key={type.id}
          className={`p-4 flex items-center space-x-2 hover:bg-gray-300 shadow-black  shadow-md ${
            selectedType?.name === type.name ? "bg-gray-300" : "bg-gray-700"
          }`}
          onClick={() => setSelectedType(type.name)}
        >
          <type.icon
            color="#ffa500"
            className="text-xl"
          />
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
