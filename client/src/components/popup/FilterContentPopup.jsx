import React, { useState, useEffect } from "react";
import Popup from "../Popup";
import { useAllBrands } from "../../utils/Api/BrandEndPoint";
import Select from "react-select";

const FilterContentPopup = ({ 
  isFilterPopupOpen, 
  setIsFilterPopupOpen, 
  onFilterSubmit,
  initialBrandFilter 
}) => {
  const { data: brands, isLoading } = useAllBrands();
  const packageSizes = [50, 75, 80, 90, 100, 120, 125, 150, 175, 200, 250];

  // State for filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPackageSizes, setSelectedPackageSizes] = useState([]);

  // Initialize brand filter if it comes from URL
  useEffect(() => {
    if (initialBrandFilter) {
      setSelectedBrand(initialBrandFilter);
    }
  }, [initialBrandFilter]);

  const packageSizeOptions = packageSizes.map((size) => ({
    value: size,
    label: `${size} مل`,
  }));

  const handlePackageSizeChange = (selectedOptions) => {
    setSelectedPackageSizes(selectedOptions);
  };

  const handleFilterSubmit = () => {
    const filters = {
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      brand: selectedBrand || null,
      packageSizes: selectedPackageSizes.map((option) => option.value),
    };

    onFilterSubmit(filters);
    setIsFilterPopupOpen(false);
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrand(initialBrandFilter || ""); // Preserve brand from URL if exists
    setSelectedPackageSizes([]);
  };

  return (
    <Popup isOpen={isFilterPopupOpen} onClose={() => setIsFilterPopupOpen(false)}>
      <div className="w-full flex flex-col gap-4">
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

        {/* Brand Filter */}
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

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="w-full text-xl font-bold bg-primary py-2.5 text-white rounded-lg"
            onClick={handleFilterSubmit}
          >
            فلتر
          </button>
          <button
            className="w-full text-xl font-bold bg-gray-300 py-2.5 text-gray-800 rounded-lg"
            onClick={handleResetFilters}
          >
            إعادة تعيين
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default FilterContentPopup;