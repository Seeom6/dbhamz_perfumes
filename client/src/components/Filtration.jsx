import React, { useState } from "react";
import { useAllBrands } from "../utils/Api/BrandEndPoint";
import Select from "react-select";

const Filtration = ({ 
  onFilterSubmit, 
  initialBrandFilter,
  onClearBrandFilter 
}) => {
  const { data: brands, isLoading } = useAllBrands();
  const packageSizes = [50, 75, 80, 90, 100, 120, 125, 150, 175, 200, 250];

  // State for filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrandFilter || "");
  const [selectedPackageSizes, setSelectedPackageSizes] = useState([]);

  const packageSizeOptions = packageSizes.map((size) => ({
    value: size,
    label: `${size} مل`,
  }));

  const handlePackageSizeChange = (selectedOptions) => {
    setSelectedPackageSizes(selectedOptions);
  };

  const handleApplyFilters = () => {
    const filters = {
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      brand: selectedBrand || null,
      packageSizes: selectedPackageSizes.map((option) => option.value),
    };

    onFilterSubmit(filters);
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrand("");
    setSelectedPackageSizes([]);
    if (initialBrandFilter) {
      onClearBrandFilter();
    }
    // You might want to submit empty filters here to reset the view
    onFilterSubmit({});
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-bold text-gray-800">تصفية المنتجات</h3>
        <button 
          onClick={handleResetFilters}
          className="text-sm text-primary hover:text-primary-dark"
        >
          إعادة تعيين
        </button>
      </div>

      {/* Price Filter */}
      <div className="w-full">
        <h4 className="text-md font-semibold mb-3 text-gray-700">السعر</h4>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">الحد الأدنى</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">الحد الأعلى</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="w-full">
        <h4 className="text-md font-semibold mb-3 text-gray-700">البراند</h4>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">جميع البراندات</option>
          {brands?.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Capacity Filter */}
      <div className="w-full">
        <h4 className="text-md font-semibold mb-3 text-gray-700">حجم العبوة</h4>
        <Select
          isMulti
          options={packageSizeOptions}
          value={selectedPackageSizes}
          onChange={handlePackageSizeChange}
          placeholder="اختر أحجام العبوات"
          className="text-sm"
          classNamePrefix="select"
        />
      </div>

      {/* Apply Button */}
      <button
        className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        onClick={handleApplyFilters}
      >
        تطبيق الفلتر
      </button>
    </div>
  );
};

export default Filtration;