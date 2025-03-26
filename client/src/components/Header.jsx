import React, { useState, useContext } from "react";
import CountryDropdown from "./headerComponents/Dropdown";
import SearchBar from "./headerComponents/SearchBar";
import Links from "./headerComponents/Links";
import logo from '/assets/logo.png';
import { useLocation, useNavigate } from "react-router-dom";
import { NotAccessRoute, countries } from "../utils/data"; // Import the countries array
import { useGetMe } from "../utils/Api/AuthenticationEndPoint";
import HeaderSideBar from "./HeaderSideBar";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { Context } from "../context/StatContext"; // Import the Context
import CustomSingleValue from "./CustomFlag";
import CurrencyPopup from "./popup/CurrencyPopup";

const Header = () => {
  const navigation = useNavigate();
  const pathname = useLocation().pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: getMe, isError, error, isLoading } = useGetMe();
  const { currency } = useContext(Context); // Access the active currency from Context
 const [isCurrencyPopupOpen, setIsCurrencyPopupOpen] = useState(false);
  // Find the active country based on the currency
  const activeCountry = countries.find((country) => country.currency === currency);

  const checkUser = () => {
    if (getMe?.roles === "admin") {
      navigation("/dashboard");
    } else {
      navigation("/login");
    }
  };
 

  return (
 
    <div className={` ${NotAccessRoute.includes(pathname) ? "hidden" : ''} h-[68px] md:h-[100px] w-full fixed flex z-50 bg-white items-center justify-around md:justify-center shadow-regularShadow px-2.5 mb-5`}>
      <div className="max-w-[1240px] w-full relative h-full flex justify-between items-center">
        <div className="w-11 h-11 md:w-20 md:h-16" onClick={checkUser}>
          <img className="w-8 h-8 md:w-16 md:h-16 object-fit" src={logo} alt="" />
        </div>
        <div className="w-full h-full flex flex-col justify-evenly text-ford">
          <SearchBar />
          <Links />
        </div>
        <div 
        className="currency-display cursor-pointer" 
        onClick={() => setIsCurrencyPopupOpen(true)}
      >
        {activeCountry && (
          <div className="flex items-center gap-3">
            <CustomSingleValue data={activeCountry.value} />
            <span className="text-[10px] md:text-medium">{activeCountry.currency}</span>
          </div>
        )}
      </div>
        <div onClick={() => setSidebarOpen(true)} className="flex md:hidden text-large px-1">
          <IoIosMenu />
        </div>
        <HeaderSideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>
      <CurrencyPopup
        isOpen={isCurrencyPopupOpen}
        onClose={() => setIsCurrencyPopupOpen(false)}
      />
    </div>
  );
};

export default Header;