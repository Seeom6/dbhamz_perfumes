import React, { useState } from "react";
import { Brands } from "../utils/data.jsx";
import { useAllBrands } from "../utils/Api/BrandEndPoint.js";
import Select from "react-select";

const Filtration = ({ onFilterSubmit }) => {
  const { data: brands, isLoading } = useAllBrands();
  const packageSizes = [50, 75, 80, 90, 100, 120, 125, 150, 175, 200, 250];

  // State for filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPackageSizes, setSelectedPackageSizes] = useState([]);

  // Convert packageSizes to options for react-select
  const packageSizeOptions = packageSizes.map((size) => ({
    value: size,
    label: `${size} مل`,
  }));

  // Handle package size selection
  const handlePackageSizeChange = (selectedOptions) => {
    setSelectedPackageSizes(selectedOptions);
  };

  // Handle filter submission
  const handleFilterSubmit = () => {
    const filters = {
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      brand: selectedBrand,
      packageSizes: selectedPackageSizes.map((option) => option.value),
    };

    // Pass filters to the parent component or API
    onFilterSubmit(filters);
  };

  return (
    <div className="w-full p-2.5 lg:flex flex-col gap-5">
      <p className="text-2xl font-bold text-primary pb-3 border-b-2 w-full">
        فلتر
      </p>

      {/* Price Filter */}
      <div className="w-full flex flex-col justify-start bg-fifed p-2">
        <p className="text-large font-semibold border-b mb-3">السعر</p>
        <div className="w-full flex flex-col text-regular">
          <div>
            <label className=""> الحد الادنى</label>
            <input
              className="w-full h-7 bg-white"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label>الحد الاعلى</label>
            <input
              className="w-full h-7 bg-white"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Brand Filter (Dropdown) */}
      <div className="w-full flex flex-col justify-start bg-fifed p-2">
        <p className="text-large font-semibold border-b mb-3">البراند</p>
        <select
          className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">اختر البراند</option>
          {brands?.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Capacity Filter */}
      <div className="w-full flex flex-col justify-start bg-fifed p-2">
        <p className="text-large font-semibold border-b mb-3">حجم العبوة</p>
        <Select
          isMulti
          options={packageSizeOptions}
          value={selectedPackageSizes}
          onChange={handlePackageSizeChange}
          placeholder="اختر أحجام العبوات"
          className="w-full"
        />
      </div>

      {/* Filter Button */}
      <button
        className="text-xl font-bold bg-primary py-2.5 text-white rounded-lg"
        onClick={handleFilterSubmit}
      >
        فلتر
      </button>
    </div>
  );
};

export default Filtration;