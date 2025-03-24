import React, { useContext } from "react";
import { countries } from "../../utils/data";
import CustomSingleValue from "../CustomFlag";
import { Context } from "../../context/StatContext";

const CurrencyPopup = ({ isOpen, onClose }) => {
  const { updateCurrency } = useContext(Context);

  if (!isOpen) return null; // Correctly handle the isOpen condition

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] bg-opacity-50 z-[100]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-bold mb-4">Select Your Currency</h2>
        <div className="flex flex-col gap-2">
          {countries.map((country) => (
            <button
              key={country.value}
              onClick={() => {
                updateCurrency(country.currency);
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              <CustomSingleValue data={country.value} />
              <span>{country.currency}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyPopup;