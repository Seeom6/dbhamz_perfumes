import React, { useState } from "react";
import logo from "/assets/logo.png";
import { navLink } from "../utils/data";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import CurrencyPopup from './popup/CurrencyPopup';

const HeaderSideBar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isCurrencyPopupOpen, setIsCurrencyPopupOpen] = useState(false);

  return (
    <div className="h-screen lg:hidden">
      <CurrencyPopup
        isOpen={isCurrencyPopupOpen}
        onClose={() => setIsCurrencyPopupOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(53,52,52,0.65)] bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed h-screen lg:static z-80 inset-y-0 right-0 w-64 bg-white shadow-lg p-6 space-y-8 transform transition-transform duration-200 ease-in-out 
          ${
            sidebarOpen
              ? "translate-x-[0px]"
              : "translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex justify-between items-center lg:justify-center">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 lg:w-24 lg:h-24 rounded-full"
          />
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <IoClose size={24} />
          </button>
        </div>

        {navLink.map((item, idx) => (
          <NavLink
            onClick={() => setSidebarOpen(false)}
            to={item.href}
            key={idx}
            className={({ isActive }) => {
              return (
                "w-full flex items-center gap-3 " +
                (isActive &&
                  "font-bold bg-primary border-b-2 p-1 rounded-lg text-white")
              );
            }}
          >
            <span className="p-1.5 border-2 rounded-xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}

<button
  onClick={() => {
    setIsCurrencyPopupOpen(true);
    console.log("clicked");
  }}
  className="w-full flex items-center gap-3 p-1 border-2 border-transparent rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105"
>
  <span className="p-2 border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-primary transition-all duration-500">
    💰
  </span>
  <span className="font-semibold">تغيير العملة </span>
</button>
      </div>
    </div>
  );
};

export default HeaderSideBar;