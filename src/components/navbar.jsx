import React, { useState, useEffect } from "react";
import { CiPizza } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const Navbar = ({ items }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="z-50 w-full fixed backdrop-blur-sm px-4 md:pl-24 md:pr-12 py-4 flex justify-between md:items-center font-medium">
      <CiPizza
        color="#B22222"
        size={50}
        className=""
      />

      <div
        className="md:hidden absolute right-6 top-9"
        onClick={handleMenuToggle}
      >
        {menuOpen ? (
          <FaTimes
            size={30}
            color="#B22222"
          />
        ) : (
          <FaBars
            size={30}
            color="#B22222"
          />
        )}
      </div>

      <ul
        className={`flex-col bg-white  md:bg-transparent shadow-md md:shadow-none py-4 px-12 md:p-0 md:flex-row md:flex gap-1 md:gap-4 md:items-center text-lg ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {items.map((item) => (
          <li key={item.page}>
            <Link
              to={item.page}
              className={`flex justify-center items-center gap-1 rounded-md md:bg-[#ffd900ee] px-3 py-2 text-sm font-semibold text-[green-700] md:hover:text-[#B22222] ${
                currentPage === `/${item.page}`
                  ? "active text-[#B22222] italic md:hover:shadow-none"
                  : "md:shadow-lg md:shadow-[#b2222251] "
              }`}
              onClick={() => setMenuOpen(false)}
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
