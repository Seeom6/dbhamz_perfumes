import React, { useState, useEffect } from "react";
import Popup from "./../../Popup";
import Loading from "./../../Loading";
import { useUpdateProduct } from "../../../utils/Api/ApiEndPoint";
import { useAllBrands } from "../../../utils/Api/BrandEndPoint";
import Select from "react-select";

const UpdatePopup = ({ product, closePopup, isPopupOpen }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(product?.imageCover || "");
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    sold: 0,
    brand: "",
    priceAfterDiscount: 0,
    quantity: 0,
    packageSize: [],
    description: "",
  });

  const { data: brands, isLoading: isBrandsLoading } = useAllBrands();
  const packageSizes = [50, 75, 80, 90, 100, 120, 125, 150, 175, 200, 250];

  // Convert packageSizes to options for react-select
  const packageSizeOptions = packageSizes.map((size) => ({
    value: size,
    label: `${size}`,
  }));

  // Initialize form data with product data when the component mounts or product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || "",
        price: product?.price || 0,
        sold: product?.sold || 0,
        brand: product?.brand?._id || "",
        priceAfterDiscount: product?.priceAfterDiscount || 0,
        quantity: product?.quantity || 0,
        packageSize: product?.packageSize || [],
        description: product?.description || "",
      });
      setPreviewImage(product?.imageCover || "");
    }
  }, [product]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle package size selection
  const handlePackageSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      packageSize: selectedSizes,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Prepare form data for submission
  const prepareFormData = () => {
    const data = new FormData();
    for (const key in formData) {
      if (key === "packageSize") {
        // Append each package size individually
        formData[key].forEach((size) => data.append("packageSize", size));
      } else {
        data.append(key, formData[key]);
      }
    }
    if (selectedImage) {
      data.append("imageCover", selectedImage);
    }
    return data;
  };

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = prepareFormData();
    updateProduct(
      { productId: product?._id, formData: form },
      { onSuccess: closePopup }
    );
  };

  return (
    <Popup isOpen={isPopupOpen} onClose={closePopup}>
      <div className="w-full flex flex-col md:p-4 max-h-[80vh] overflow-y-auto hide-scrollbar">
        {/* Image Preview and Upload */}
        <div className="w-full flex justify-center mb-6">
          <img
            className="w-24 h-24 md:w-44 md:h-44 rounded-lg object-cover"
            src={previewImage}
            alt={product?.name}
          />
        </div>
        <div className="w-full flex justify-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="px-4 py-2 text-regular bg-dashboard text-white rounded-lg cursor-pointer hover:bg-blue-600"
          >
            تغيير الصورة
          </label>
        </div>

        {/* Form */}
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-regular font-semibold mb-1">
                اسم المنتج
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
                type="text"
                name="name"
                value={formData.name}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-regular font-semibold mb-1">
                السعر
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
                name="price"
                type="number"
                value={formData.price}
              />
            </div>

            {/* Sold Quantity */}
            <div>
              <label className="block text-regular font-semibold mb-1">
                الكمية المباعة
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
                name="sold"
                type="number"
                value={formData.sold}
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-regular font-semibold mb-1">
                الماركة
              </label>
              <select
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
                name="brand"
                value={formData.brand}
              >
                <option value="">اختر الماركة</option>
                {brands?.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Discounted Price */}
            <div>
              <label className="block text-regular font-semibold mb-1">
                السعر بعد الحسم
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
                name="priceAfterDiscount"
                type="number"
                value={formData.priceAfterDiscount}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-regular font-semibold mb-1">
                الكمية
              </label>
              <input
                onChange={handleInputChange}
                name="quantity"
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
                type="number"
                value={formData.quantity}
              />
            </div>

            {/* Package Sizes */}
            <div className="col-span-2">
              <label className="block text-regular font-semibold mb-1">
                حجم العبوة
              </label>
              <Select
                isMulti
                options={packageSizeOptions}
                value={packageSizeOptions.filter((option) =>
                  formData.packageSize.includes(option.value)
                )}
                onChange={handlePackageSizeChange}
                placeholder="اختر أحجام العبوات"
                className="w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-regular font-semibold mb-1">
              الوصف
            </label>
            <textarea
              onChange={handleInputChange}
              name="description"
              className="w-full h-24 px-3 py-2 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none resize-none"
              value={formData.description}
            />
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={closePopup}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-dashboard text-white rounded-lg hover:bg-blue-600"
            >
              {isUpdating ? <Loading width="24" height="24" /> : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default UpdatePopup;