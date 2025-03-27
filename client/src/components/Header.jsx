// Header.jsx
import React, { useState, useContext } from "react";
import SearchBar from "./headerComponents/SearchBar";
import Links from "./headerComponents/Links";
import logo from '/assets/logo.png';
import { useNavigate } from "react-router-dom";
import { countries } from "../utils/data";
import { useGetMe } from "../utils/Api/AuthenticationEndPoint";
import HeaderSideBar from "./HeaderSideBar";
import { IoIosMenu } from "react-icons/io";
import { Context } from "../context/StatContext";
import CustomSingleValue from "./CustomFlag";
import CurrencyPopup from "./popup/CurrencyPopup";

const Header = () => {
  const navigation = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: getMe } = useGetMe();
  const { currency } = useContext(Context);
  const [isCurrencyPopupOpen, setIsCurrencyPopupOpen] = useState(false);
  const activeCountry = countries.find((country) => country.currency === currency);

  const checkUser = () => {
    if (getMe?.roles === "admin") {
      navigation("/dashboard");
    } else {
      navigation("/login");
    }
  };

  return (
    <>
      {/* Header Container */}
      <div className="fixed w-full z-50 bg-white shadow-regularShadow">
        {/* Top Block - Search, Icons */}
        <div className="h-[50px] md:h-[70px] w-full border-b border-gray-100">
          <div className="max-w-[1240px] mx-auto  px-4 flex items-center justify-between">
            {/* Logo */}
            <div className="w-11 h-11 md:w-20 md:h-16 flex items-center cursor-pointer" onClick={checkUser}>
              <img className="w-8 h-8 md:w-16 md:h-16 object-contain" src={logo} alt="Logo" />
            </div>

            {/* Search Bar - Takes remaining space */}
           
            <div className="flex-1 hidden md:flex justify-center mx-4 max-w-2xl">
              <SearchBar />
            </div>
            {/* Desktop Currency */}
            <div className="hidden md:flex items-center">
              <div 
                className="currency-display cursor-pointer" 
                onClick={() => setIsCurrencyPopupOpen(true)}
              >
                {activeCountry && (
                  <div className="flex items-center gap-3">
                    <CustomSingleValue data={activeCountry.value} />
                    <span className="text-sm">{activeCountry.currency}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-4">
              <div 
                className="currency-display cursor-pointer" 
                onClick={() => setIsCurrencyPopupOpen(true)}
              >
                {activeCountry && (
                  <div className="flex items-center gap-1">
                    <CustomSingleValue data={activeCountry.value} />
                    <span className="text-[10px]">{activeCountry.currency}</span>
                  </div>
                )}
              </div>
              <button onClick={() => setSidebarOpen(true)} className="text-2xl">
                <IoIosMenu />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center p-2 md:hidden mx-4 max-w-2xl">
              <SearchBar />
            </div>
        {/* Bottom Block - Links (Desktop Only) */}
        <div className="hidden md:block h-[50px] w-full bg-white">
          <div className="max-w-[1240px] mx-auto h-full px-4">
            <Links />
          </div>
        </div>
      </div>

      {/* Spacer to prevent content overlap */}
      <div className="h-[68px] md:h-[130px]"></div>

      {/* Sidebar and Popups */}
      <HeaderSideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <CurrencyPopup
        isOpen={isCurrencyPopupOpen}
        onClose={() => setIsCurrencyPopupOpen(false)}
      />
    </>
  );
};

export default Header;