import React, { useState } from "react";
import logo from "/assets/logo.png";
import { navLink } from "../utils/data";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import CurrencyPopup from './popup/CurrencyPopup';

const HeaderSideBar = ({ setSidebarOpen, sidebarOpen }) => {
  const [isCurrencyPopupOpen, setIsCurrencyPopupOpen] = useState(false);

  return (
    <>
      <CurrencyPopup
        isOpen={isCurrencyPopupOpen}
        onClose={() => setIsCurrencyPopupOpen(false)}
      />

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: sidebarOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className={`
          fixed h-screen flex lg:hidden w-64 bg-white/95 backdrop-blur-lg shadow-2xl z-80
          right-0 top-0 border-l border-gray-100
          lg:relative lg:translate-x-0 lg:shadow-none lg:w-72
        `}
      >
        <div className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 object-contain rounded-lg border border-gray-200 p-1"
              />
              <h1 className="text-xl font-bold text-gray-800"> dbhamz</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoClose className="text-gray-500 text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            {navLink.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 p-3 rounded-xl transition-all
                  ${isActive 
                    ? "bg-gradient-to-r from-indigo-50 to-primary text-white font-medium border border-indigo-100 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-500"}
                `}
              >
                <span className={`
                  text-xl p-2 rounded-lg 
                  ${({ isActive }) => isActive ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"}
                `}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {({ isActive }) => isActive && (
                  <div className="w-2 h-2 bg-indigo-500 rounded-full ml-2"></div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto space-y-4">
            {/* Currency Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCurrencyPopupOpen(true)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-ford to-primary text-white hover:shadow-lg transition-all shadow-md"
            >
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <RiExchangeLine className="text-xl" />
              </div>
              <span className="font-medium">تغيير العملة</span>
              <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-md">USD</span>
            </motion.button>

            {/* Settings */}
            <button className="flex items-center gap-3 p-3 text-gray-600 hover:text-indigo-500 hover:bg-gray-50 rounded-xl transition-colors">
              <FiSettings className="text-lg" />
              <span className="text-sm font-medium">الإعدادات</span>
            </button>

            {/* Logout */}
            <button className="flex items-center gap-3 p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <FiLogOut className="text-lg" />
              <span className="text-sm font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HeaderSideBar;