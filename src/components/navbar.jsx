import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { useAuth } from "../context/authProvider";

const Navbar = ({ items }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <>
      <nav className="z-50 w-full fixed top-0 left-0 backdrop-blur-md bg-[#FDFDFB]/90 border-b border-[#EADBC8]/30 px-6 lg:px-16 py-4 flex justify-between items-center transition-all duration-300 shadow-[0_2px_20px_-5px_rgba(42,26,14,0.05)]">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-md bg-[#D97706]/10 group-hover:bg-[#D97706]/20 transition-all duration-300">
            <MdEmojiFoodBeverage
              color="#D97706"
              size={26}
            />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-[#2A1A0E] group-hover:text-[#D97706] transition-colors duration-300">
            Breakfast<span className="text-[#D97706]">Place</span>
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 rounded-md text-[#2A1A0E] hover:bg-[#D97706]/10 transition-colors duration-300 focus:outline-none"
          onClick={handleMenuToggle}
          aria-label="Toggle Navigation Menu"
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-5 text-sm font-semibold">
          {items.map((item) => {
            const isActive =
              currentPage === `/${item.page}` ||
              (item.page === "" && currentPage === "/");
            return (
              <li key={item.page}>
                <Link
                  to={item.page}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? "bg-[#D97706]/10 text-[#D97706]"
                      : "text-[#5C4A3C] hover:text-[#2A1A0E] hover:bg-[#2A1A0E]/5"
                  }`}
                >
                  {item.label}
                  {item.sign && <item.sign className="text-base opacity-85" />}
                </Link>
              </li>
            );
          })}

          {user ? (
            <li>
              <button
                onClick={signOut}
                className="ml-2 flex items-center gap-1.5 rounded-md border border-[#D97706] hover:bg-[#D97706]/5 text-[#D97706] px-4 py-2 text-sm font-semibold transition-all duration-300"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/signIn"
                className="ml-2 flex items-center gap-1.5 rounded-md bg-[#D97706] hover:bg-[#C26405] text-white px-5 py-2 text-sm font-semibold shadow-md shadow-[#D97706]/15 hover:shadow-none transition-all duration-300"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-[#2A1A0E]/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[#FDFDFB] shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden flex flex-col p-6 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <MdEmojiFoodBeverage color="#D97706" size={26} />
            <span className="font-display text-lg font-semibold text-[#2A1A0E]">
              Breakfast<span className="text-[#D97706]">Place</span>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md text-[#2A1A0E] hover:bg-[#D97706]/10 transition-colors duration-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="flex flex-col gap-2 font-semibold text-base mb-8">
          {items.map((item) => {
            const isActive =
              currentPage === `/${item.page}` ||
              (item.page === "" && currentPage === "/");
            return (
              <li key={item.page}>
                <Link
                  to={item.page}
                  className={`flex items-center justify-between px-4 py-3 rounded-md transition-all duration-300 ${
                    isActive
                      ? "bg-[#D97706]/10 text-[#D97706]"
                      : "text-[#5C4A3C] hover:text-[#2A1A0E] hover:bg-[#2A1A0E]/5"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  {item.sign && <item.sign className="text-lg opacity-85" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-[#EADBC8]/40 pt-6">
          {user ? (
            <button
              onClick={() => {
                signOut();
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-[#D97706] hover:bg-[#D97706]/5 text-[#D97706] py-3 text-sm font-bold transition-all duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signIn"
              className="w-full flex items-center justify-center gap-2 rounded-md bg-[#D97706] hover:bg-[#C26405] text-white py-3 text-sm font-bold shadow-lg shadow-[#D97706]/10 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
