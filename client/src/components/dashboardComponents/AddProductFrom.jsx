import React, { useState } from "react";
import { useAllBrands } from "../../utils/Api/BrandEndPoint";
import Loading from "../Loading";
import Select from "react-select";

const AddProductForm = ({ setProductData }) => {
  const { data: brands, isLoading } = useAllBrands();
  const packageSizes = [50, 75, 70 ,60,80, 90, 100, 120, 125, 150, 175, 200, 250 , 500];

  const [isClicked, setIsClicked] = useState(false);
  // Handle input changes for text, number, and select fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for the multi-select package size field
  const handlePackageSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setProductData((prev) => ({
      ...prev,
      packageSize: selectedSizes, // Ensure packageSize is a flat array
    }));
  };

  const packageSizeOptions = packageSizes.map((size) => ({
    value: size,
    label: `${size}`,
  }));

  const updateQuantity = async (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);
    if (isClicked === false) {
      setProductData((prev) => ({
        ...prev,
        quantity: -1, // Ensure packageSize is a flat array
      }));
    } else if (isClicked === true) {
      setProductData((prev) => ({
        ...prev,
        quantity: 0, // Ensure packageSize is a flat array
      }));
    }
  };



  return (
    <div>
      <div className="w-full flex flex-col md:flex-row gap-10">
        <div className="w-full flex flex-col justify-between items-center gap-3 md:gap-8">
          <div className="w-full flex gap-3">
            <div className="w-full">
              <label className="text-regular">اسم المنتج</label>
              <input
                onChange={handleInputChange}
                className="inputClass shadow-input"
                type="text"
                name="name"
                 // Ensure the field is 
              />
            </div>
            <div className="w-full">
              <label className="text-regular">اسم بالأنجليزي</label>
              <input
                onChange={handleInputChange}
                className="inputClass shadow-input"
                type="text"
                name="englishName"
                 // Ensure the field is 
              />
            </div>
          </div>

          <div className="w-full flex gap-3">
            <div className="w-full">
              <label>السعر</label>
              <input
                onChange={handleInputChange}
                className="inputClass shadow-input"
                name="price"
                type="number"
                 // Ensure the field is 
              />
            </div>

            <div className="w-full">
              <label>السعر بعد الحسم</label>
              <input
                onChange={handleInputChange}
                className="inputClass shadow-input"
                name="priceAfterDiscount"
                type="number"
                 // Ensure the field is 
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-between items-center gap-8">
          <div className="w-full">
            <label className="block text-regular font-semibold mb-1">
              الماركة
            </label>
            {isLoading ? (
              <Loading width="30" height="30" />
            ) : (
              <select
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
                name="brand"
                 // Ensure the field is 
              >
                <option value="">اختر الماركة</option>
                {brands?.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full">
              <label>الكمية المباعة</label>
              <input
                onChange={handleInputChange}
                className="inputClass shadow-input"
                name="sold"
                type="number"
                defaultValue={20}
                 // Ensure the field is 
              />
            </div>
            <div className="w-full flex gap-3 items-end justify-center">
              <div>
                <label> الكمية الموجودة</label>
                <input
                  onChange={handleInputChange}
                  name="quantity"
                  className="inputClass shadow-input"
                  type="number"
                  defaultValue={1}
                   // Ensure the field is 
                />
              </div>
              <button
                onClick={updateQuantity}
                className={`w-28 text-center bg-dashboard h-10 text-white rounded-md text-extraSmall ${
                  isClicked && "opacity-20"
                }`}
              >
                غير متوفر
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label>حجم العبوة</label>
        <Select
          isMulti
          options={packageSizeOptions}
          onChange={handlePackageSizeChange}
          placeholder="اختر أحجام العبوات"
          className="w-full"
           // Ensure the field is 
        />
      </div>
          


      <div className="">
        <label>الوصف</label>
        <textarea
          onChange={handleInputChange}
          name="description"
          className="w-full focus:border rounded-lg focus:border-dashboard shadow-input h-24 outline-0 p-3"
           // Ensure the field is 
        />
      </div>

    </div>
  );
};

export default AddProductForm;
