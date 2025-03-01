import Popup from './../../Popup';
import { MdErrorOutline } from 'react-icons/md';
import Loading from './../../Loading';
import { useDeleteProduct } from '../../../utils/Api/ApiEndPoint';

const DeletePopup = ({product ,closePopup , isPopupOpen}) => {


  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const handleDelete = (productId) => {
    deleteProduct(productId, {
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
            هل انت متأكد من حذف هذا المنتج؟
          </p>
          <p className="font-bold text-regular md:text-large">( {product?.name} )</p>
          <p className="text-[#787878] md:text-regular text-small font-semibold">
            لن تتمكن من التراجع عن هذا
          </p>
          <div className="w-full flex justify-center items-center gap-4">
            <button
              onClick={() => handleDelete(product?._id)}
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

export default DeletePopup
