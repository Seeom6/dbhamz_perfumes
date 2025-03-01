import Popup from './../../Popup';
import { MdErrorOutline } from 'react-icons/md';
import Loading from './../../Loading';
import { useDeleteBrand } from '../../../utils/Api/BrandEndPoint';

const DeleteBrandPopup = ({brand ,closePopup , isPopupOpen}) => {

  const { mutate: deleteBrand, isPending } = useDeleteBrand();
  const handleDelete = (brandId) => {
    deleteBrand(brandId, {
      onSuccess: () => {
        closePopup();
      },
    });
  };

  return (
    <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <div className="w-full flex justify-center text-6xl text-[#DF0404]">
            <MdErrorOutline />
          </div>
          <p className="font-bold text-regular md:text-large">
            هل انت متأكد من حذف هذا الماركة؟
          </p>
          <p className="font-bold text-regular md:text-large">( {brand?.name} )</p>
          <p className="text-[#787878] md:text-regular text-small font-semibold">
            لن تتمكن من التراجع عن هذا
          </p>
          <div className="w-full flex justify-center items-center gap-4">
            <button
              onClick={() => handleDelete(brand?._id)}
              className="text-small w-24 p-2 bg-dashboard rounded-sm text-white font-bold"
            >
              {isPending ? <Loading width="24" height="24" /> : "نعم,أنا متأكد"}
            </button>
            <button
              onClick={closePopup}
              className="  text-small w-24 p-2 bg-white rounded-sm text-dashboard border font-bold"
            >
              رجوع
            </button>
          </div>
        </div>
      </Popup>
  )
}

export default DeleteBrandPopup
