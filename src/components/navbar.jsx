import React, { useState, useEffect } from "react";
import { MdEmojiFoodBeverage } from "react-icons/md";
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
    <nav className="z-40 w-full fixed backdrop-blur-sm px-4 md:pl-24 md:pr-12 py-4 flex justify-between md:items-center font-medium">
      <Link to="/">
        <MdEmojiFoodBeverage
          color="#6F4E37"
          size={50}
        />
      </Link>

      <div
        className="md:hidden absolute right-6 top-9"
        onClick={handleMenuToggle}
      >
        {menuOpen ? (
          <FaTimes
            size={30}
            color="#6F4E37"
          />
        ) : (
          <FaBars
            size={30}
            color="#6F4E37"
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
              className={`flex justify-center items-center gap-1 rounded-md md:bg-[#D2691E] px-3 py-2 text-sm font-semibold md:hover:text-[#6F4E37] ${
                currentPage === `/${item.page}`
                  ? "active text-[#2b1e15] italic md:hover:shadow-none"
                  : "md:shadow-lg md:shadow-[#6F4E37] text-[#D2691E] md:text-white"
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
