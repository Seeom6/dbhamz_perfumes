import React, { useState, useEffect, useRef } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { navLink } from "../../utils/data.jsx";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-3xl transition-transform duration-300 hover:scale-110"
      >
        {isOpen ? <IoIosClose /> : <IoIosMenu />}
      </button>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
          {/* Menu */}
          <div className="absolute left-[-13px] mt-2 w-48 bg-white rounded-lg shadow-xl z-50 transform transition-all duration-300 ease-in-out">
            <ul className="py-2">
              {navLink.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={toggleMenu} // Close menu when a link is clicked
                    className={({ isActive }) =>
                      `block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200 border-b ${
                        isActive ? "font-bold text-primary" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;