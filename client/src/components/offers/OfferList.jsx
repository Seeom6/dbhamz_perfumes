import { FaEdit as PencilSquareIcon } from "react-icons/fa";
import { FaTrashAlt as TrashIcon } from "react-icons/fa";
import { FaExchangeAlt as ArrowsRightLeftIcon } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import OfferForm from "./OfferForm";
import { useAllOffers, useDeleteOffer, useToggleOfferStatus } from './../../utils/Api/OfferEndPoint';

const OfferList = () => {
  const { data: apiResponse, isLoading, error, refetch } = useAllOffers();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { mutate: deleteOffer } = useDeleteOffer();
  const { mutate: toggleStatus } = useToggleOfferStatus();

  // Safely extract offers from different possible response structures
  const offers = Array.isArray(apiResponse) 
    ? apiResponse 
    : apiResponse?.data || apiResponse?.offers || [];

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العرض؟")) {
      try {
         deleteOffer(id, {
          onSuccess: () => {
            toast.success("تم حذف العرض بنجاح");
            refetch(); // تحديث قائمة العروض بعد الحذف
          }
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setIsFormOpen(true);
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleStatus(id, {
        onSuccess: () => {
          toast.success("تم تحديث حالة العرض بنجاح");
          refetch(); // تحديث قائمة العروض بعد تغيير الحالة
        },
        onError: (error) => {
          toast.error(error.message || "فشل في تحديث الحالة");
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <div className="text-center py-8">جاري تحميل العروض...</div>;
  if (error) return <div className="text-center py-8 text-red-500">خطأ: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة العروض</h2>
        <button
          onClick={() => {
            setSelectedOffer(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          إضافة عرض جديد
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الصورة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                العنوان
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التواريخ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  لا توجد عروض متاحة
                </td>
              </tr>
            ) : (
              offers.map((offer) => (
                <tr key={offer._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-24 relative rounded-md overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">{offer.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {offer.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${offer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {offer.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {new Date(offer.startDate).toLocaleDateString('ar-EG')} -{' '}
                    {offer.endDate ? new Date(offer.endDate).toLocaleDateString('ar-EG') : 'لا يوجد تاريخ انتهاء'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => handleEdit(offer)}
                        className="text-blue-600 hover:text-blue-900"
                        title="تعديل"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(offer._id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="تغيير الحالة"
                      >
                        <ArrowsRightLeftIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(offer._id)}
                        className="text-red-600 hover:text-red-900"
                        title="حذف"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <OfferForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        offer={selectedOffer}
        onSuccess={() => refetch()} // تحديث القائمة بعد الإرسال
      />
    </div>
  );
};

export default OfferList;