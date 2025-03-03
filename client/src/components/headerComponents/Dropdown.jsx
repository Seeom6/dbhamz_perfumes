import React, { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { countries } from "../../utils/data.jsx";
import CustomSingleValue from "../CustomFlag.jsx";

// Custom single value component to display the selected flag and country name

const CountryDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div className="relative flex flex-col justify-center items-center z-80 w-[70px] md:w-[150px] rounded-lg">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className=" md:p-2 w-full text-black flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
      >
        <div className=" flex items-end justify-end md:border-l-2">
          {isOpen && (
            <div className="bg-white absolute w-full left-0 top-6 md:top-10 flex flex-col gap-1 items-start rounded-lg p-2">
              {countries.map((item, idx) => (
                <button
                  onClick={() => handleChange(item.value)}
                  key={idx}
                  className="flex md:py-1 w-full justify-between hover:bgblue-300 cursor-pointer text-extraSmall md:text-medium rounded-r-lg border-l-transparent"
                >
                  <p className="font-bold text-small">{item.flag}</p>
                  {<CustomSingleValue data={item.flag} />}
                </button>
              ))}
            </div>
          )}
          {!isOpen ? (
            <FaAngleDown className="text-extraSmall md:text-regular h-8 mx-2 " />
          ) : (
            <FaAngleUp className="text-extraSmall md:text-regular h-8 mx-2 " />
          )}
        </div>
        <div className="w-full flex justify-center text-extraSmall md:text-medium">
          <p>{selectedCountry ? selectedCountry : "KW"}</p>
          <CustomSingleValue data={selectedCountry ? selectedCountry : "KW"} />
        </div>
      </div>
    </div>
  );
};

export default CountryDropdown;

// const countries = [
//   { value: "SA", label: "Saudi Arabia" },
//   { value: "AE", label: "Emirates" },
//   { value: "QA", label: "Qatar" },
//   { value: "KW", label: "Kuwait" },
//   { value: "OM", label: "Oman" },
// ];
