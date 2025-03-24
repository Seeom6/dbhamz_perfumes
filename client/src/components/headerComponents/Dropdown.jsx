import React, { useState, useContext } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { countries } from "../../utils/data";
import CustomSingleValue from "../CustomFlag"; // Ensure this component is correctly implemented
import { Context } from "../../context/StatContext";

const CountryDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState(null); // Initialize as null
  const [isOpen, setIsOpen] = useState(false);
  const { updateCurrency } = useContext(Context); // Access the updateCurrency function

  const handleChange = (value, currency) => {
    setSelectedCountry(value); // Set the selected country value
    updateCurrency(currency); // Update the global currency state
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative flex flex-col justify-center items-center z-80 w-[70px] md:w-[150px] rounded-lg">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:p-2 w-full text-black flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
      >
        <div className="flex items-end justify-end md:border-l-2">
          {!isOpen ? (
            <FaAngleDown className="text-extraSmall md:text-regular h-8 mx-2" />
          ) : (
            <FaAngleUp className="text-extraSmall md:text-regular h-8 mx-2" />
          )}
        </div>
        <div className="w-full flex justify-center text-extraSmall md:text-medium">
          {/* Display the selected country's flag and name */}
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <CustomSingleValue data={selectedCountry} />
              <p>{selectedCountry}</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CustomSingleValue data="KW" /> {/* Default flag */}
              <p>KW</p> {/* Default value if no country is selected */}
            </div>
          )}
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="bg-white absolute w-full left-0 top-6 md:top-10 flex flex-col gap-1 items-start rounded-lg p-2">
          {countries.map((item, idx) => (
            <button
              onClick={() => handleChange(item.value, item.currency)} // Pass the country value and currency
              key={idx}
              className="flex md:py-1 w-full justify-between hover:bg-blue-300 cursor-pointer gap-5 text-extraSmall md:text-medium rounded-r-lg border-l-transparent"
            >
              <div className="w-full border-b flex justify-between items-center gap-2">
                <CustomSingleValue data={item.value} /> {/* Display the flag */}
                <p>{item.name}</p> {/* Display the country name */}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;