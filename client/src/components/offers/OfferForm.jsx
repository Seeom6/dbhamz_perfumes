import { FaTimes as XMarkIcon } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateOffer, useUpdateOffer , useDeleteOffer } from './../../utils/Api/OfferEndPoint';

const OfferForm = ({ isOpen, onClose, offer }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageFile: null, // For file upload
    image: "", // For existing image URL
    isActive: true,
    startDate: new Date(),
    endDate: null,
    order: 0,
  });
  const [preview, setPreview] = useState("");

  const {mutate: createOffer} = useCreateOffer();
  const updateOffer = useUpdateOffer();

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title,
        description: offer.description || "",
        imageFile: null,
        image: offer.image,
        isActive: offer.isActive,
        startDate: new Date(offer.startDate),
        endDate: offer.endDate ? new Date(offer.endDate) : null,
        order: offer.order || 0,
      });
      setPreview(offer.image || "");
    } else {
      setFormData({
        title: "",
        description: "",
        imageFile: null,
        image: "",
        isActive: true,
        startDate: new Date(),
        endDate: null,
        order: 0,
      });
      setPreview("");
    }
  }, [offer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        image: "" // Clear URL if file is selected
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formatDate = (date) => {
        if (!date) return null; // Return null instead of empty string
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isActive", formData.isActive);
      formDataToSend.append("startDate", formatDate(formData.startDate));
      
      // Only append endDate if it exists
      const formattedEndDate = formatDate(formData.endDate);
      if (formattedEndDate) {
        formDataToSend.append("endDate", formattedEndDate);
      }
      
      formDataToSend.append("order", formData.order);
      
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      } else if (formData.image) {
        formDataToSend.append("imageUrl", formData.image);
      }
  
      if (offer) {
        await updateOffer.mutateAsync({ id: offer._id, formData: formDataToSend });
        toast.success("تم تحديث العرض بنجاح");
      } else {
        createOffer(formDataToSend, {
          onSuccess: (res) => {
            console.log(res);
            toast.success("تم إنشاء العرض بنجاح");
          },
          onError: (res) => {
            console.log(res);
          }
        });
      }
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {offer ? "تعديل العرض" : "إضافة عرض جديد"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              العنوان *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-right"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              الوصف
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              صورة العرض *
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1 text-right">أو</p>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="رابط الصورة"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-1 text-right"
              dir="rtl"
            />
            {(preview || formData.image) && (
              <div className="mt-2">
                <div className="h-32 w-full relative rounded-md overflow-hidden border">
                  <img
                    src={preview || formData.image}
                    alt="معاينة الصورة"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                تاريخ البدء
              </label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date, "startDate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-right"
                dateFormat="yyyy/MM/dd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                تاريخ الانتهاء (اختياري)
              </label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange(date, "endDate")}
                minDate={formData.startDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-right"
                isClearable
                dateFormat="yyyy/MM/dd"
                placeholderText="اختياري"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                ترتيب العرض
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-right"
                dir="rtl"
              />
            </div>

            <div className="flex items-center justify-end">
              <label className="ml-2 block text-sm text-gray-700 text-right">
                عرض نشط
              </label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {offer ? "تحديث العرض" : "إنشاء العرض"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferForm;