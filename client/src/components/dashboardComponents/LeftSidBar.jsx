import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { dashboardLinks } from "../../utils/data.jsx";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const LeftSidBar = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <div className="h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(53,52,52,0.65)] bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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

        {dashboardLinks.map((item, idx) => (
          <NavLink
            onClick={() => setSidebarOpen(false)}
            to={item.href}
            key={idx}
            className={({ isActive }) => {
              return (
                "w-full flex items-center gap-5 " +
                (isActive &&
                  "font-bold bg-dashboard border-b-2 p-1 rounded-lg text-white")
              );
            }}
          >
            <span className="p-1.5 border-2 rounded-xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftSidBar;
