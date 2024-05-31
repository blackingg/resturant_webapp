import React, { useState, useEffect } from "react";
import { CiPizza } from "react-icons/ci";
import { useLocation, Link } from "react-router-dom";

import { FaCartShopping } from "react-icons/fa6";

const Navbar = ({ items }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <nav className="w-screen absolute z-50 pl-24 pr-12 py-4 flex justify-between items-center font-medium">
      <CiPizza
        color="#B22222"
        size={50}
      />
      <ul className="flex gap-4 items-center text-lg">
        {items.map((item) => (
          <li key={item.page}>
            <Link
              to={item.page}
              className={`flex justify-center items-center gap-1 rounded-md bg-[#ffd900ee] px-3 py-2 text-sm font-semibold text-[green-700] hover:text-[#B22222] ${
                currentPage === `/${item.page}`
                  ? "active text-[#B22222] italic hover:shadow-none"
                  : "shadow-lg shadow-[#b2222251] "
              }`}
            >
              {item.label}
              {<item.sign />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
