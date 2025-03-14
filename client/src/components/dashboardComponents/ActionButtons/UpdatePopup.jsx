import React, { useState, useEffect } from "react";
import Popup from "./../../Popup";
import Loading from "./../../Loading";
import { useUpdateProduct } from "../../../utils/Api/ApiEndPoint";
import { useAllBrands } from "../../../utils/Api/BrandEndPoint";
import Select from "react-select";
import { FaImage, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const UpdatePopup = ({ product, closePopup, isPopupOpen }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

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
    images: [],
  });

  const { data: brands, isLoading: isBrandsLoading } = useAllBrands();
  const packageSizes = [
    50, 75, 70, 60, 80, 90, 100, 120, 125, 150, 175, 200, 250, 500,
  ];

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
        images: product?.images || [],
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

  const updateQuantity = async (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);
    if (isClicked === false) {
      setFormData((prev) => ({
        ...prev,
        quantity: -1, // Ensure packageSize is a flat array
      }));
    } else if (isClicked === true) {
      setFormData((prev) => ({
        ...prev,
        quantity: 0, // Ensure packageSize is a flat array
      }));
    }
  };

  // Handle additional images upload
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  // Remove an additional image
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Prepare form data for submission
  const prepareFormData = () => {
    const data = new FormData();
    for (const key in formData) {
      if (key === "packageSize") {
        // Append each package size individually
        formData[key].forEach((size) => data.append("packageSize", size));
      } else if (key === "images") {
        // Append each image file
        formData[key].forEach((image) => data.append("images", image.file));
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
      <div className="w-full flex flex-col md:p-6 max-h-[80vh] overflow-y-auto hide-scrollbar bg-gradient-to-br from-[#f9f9f9] to-[#ffffff] rounded-xl">
        {/* Image Preview and Upload */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-lg overflow-hidden relative shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={previewImage}
              alt={product?.name}
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all transform hover:scale-110"
            >
              <FaImage className="text-dashboard" size={18} />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
          </div>
        </div>

        {/* Additional Images */}
        <div className="w-full mb-6">
          <label className="block text-regular font-semibold mb-2 text-[#333333]">
            صور إضافية
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image?.preview ? image?.preview : image}
                  alt={`Additional Image ${index}`}
                  className="w-16 h-16 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all transform hover:scale-110"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
            <label
              htmlFor="additional-images"
              className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              <FaImage className="text-gray-500" size={20} />
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesChange}
              className="hidden"
              id="additional-images"
            />
          </div>
        </div>

        {/* Form */}
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-regular font-semibold mb-1 text-[#333333]">
                اسم المنتج
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none shadow-sm"
                type="text"
                name="name"
                value={formData.name}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-regular font-semibold mb-1 text-[#333333]">
                السعر
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none shadow-sm"
                name="price"
                type="number"
                value={formData.price}
              />
            </div>

            {/* Sold Quantity */}
            <div>
              <label className="block text-regular font-semibold mb-1 text-[#333333]">
                الكمية المباعة
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none shadow-sm"
                name="sold"
                type="number"
                value={formData.sold}
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-regular font-semibold mb-1 text-[#333333]">
                الماركة
              </label>
              <select
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none shadow-sm"
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
              <label className="block text-regular font-semibold mb-1 text-[#333333]">
                السعر بعد الحسم
              </label>
              <input
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none shadow-sm"
                name="priceAfterDiscount"
                type="number"
                value={formData.priceAfterDiscount}
              />
            </div>

            {/* Quantity */}
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

            {/* Package Sizes */}
            <div className="col-span-2">
              <label className="block text-regular font-semibold mb-1 text-[#333333]">
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
                className="w-full shadow-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-regular font-semibold mb-1 text-[#333333]">
              الوصف
            </label>
            <textarea
              onChange={handleInputChange}
              name="description"
              className="w-full h-24 px-3 py-2 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none shadow-sm resize-none"
              value={formData.description}
            />
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={closePopup}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-dashboard text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
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
