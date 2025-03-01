import React, { useState, useEffect } from "react";
import Popup from "./../../Popup";
import Loading from "./../../Loading";
import { useUpdateBrand } from "../../../utils/Api/BrandEndPoint"; // Replace with your brand update API hook

const UpdateBrandPopup = ({ brand, closePopup, isPopupOpen }) => {
  const [selectedImage, setSelectedImage] = useState(""); // State for the new image
  const [previewImage, setPreviewImage] = useState(brand?.image); // State for the preview image
  const [name, setName] = useState(brand?.name || ""); // State for the brand name

  // Initialize form data when the component mounts or brand changes
  useEffect(() => {
    if (brand) {
      setName(brand?.name || "");
      setPreviewImage(brand?.image || "");
    }
  }, [brand]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Save the selected file
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const { mutate: updateBrand, isPending } = useUpdateBrand();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name); // Append the brand name
    if (selectedImage) {
      formData.append("image", selectedImage); // Append the brand image if a new one is selected
    }
    updateBrand(
      { brandId: brand?._id, formData },
      {
        onSuccess: () => {
          closePopup(); // Close the popup on success
        },
      }
    );
  };

  return (
    <Popup isOpen={isPopupOpen} onClose={closePopup}>
      <div className="w-full flex flex-col md:p-4 max-h-[80vh] overflow-y-auto hide-scrollbar">
        <div className="w-full flex justify-center mb-6">
          {/* Display the preview image or the old image */}
          <img
            className="w-24 h-24 md:w-44 md:h-44 rounded-lg object-cover"
            src={previewImage || brand?.image}
            alt={brand?.name}
          />
        </div>
        {/* File input for image upload */}
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
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Brand Name Input */}
          <div className="w-full">
            <label className="block text-regular font-semibold mb-1">
              اسم الماركة
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-dashboard focus:outline-none"
              type="text"
              value={name}
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
              {isPending ? <Loading width={"24"} height="24" /> : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default UpdateBrandPopup;