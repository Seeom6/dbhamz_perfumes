import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAddCart } from "../../utils/Api/CartEndPoint";
import { toast } from "react-toastify";
import Loading from "./../Loading";
import { useGetMe } from "../../utils/Api/AuthenticationEndPoint";
import { addToLocalStorageCart } from "../../utils/localStorageCart";
import { convertCurrency } from "../../utils/currency.js";
import { CurrencyContext } from "../../context/CurrencyContext";
import { useContext } from 'react';



const ProductCard = ({ product }) => {

  const { currency } = useContext(CurrencyContext);
  const convertedPrice = convertCurrency(product?.price, "KWD", currency);
  const navigate = useNavigate();
  const { mutate: addCart, isPending } = useAddCart();
  const { data: getMe } = useGetMe();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  const addProductToCart = (productId, quantity) => {
    if (!getMe) {
      addToLocalStorageCart(product, quantity);
      toast.success("تم إضافة المنتج إلى السلة");
    } else {
      addCart(
        { productId, quantity },
        {
          onSuccess: () => {
            toast.success("تم إضافة المنتج إلى السلة");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  return (
    <div className="shadow-regularShadow flex items-center flex-col justify-between p-2 rounded-lg">
      <div  onClick={() => handleClick(product?._id)}>
        <div className="w-full py-1">
          <img
            className="rounded-lg w-full bg-white  shadow-xl h-full object-cover"
            src={product?.imageCover}
            alt=""
          />
        </div>
        <div>
          <p className="text-regular text-ford font-semibold">
            {product?.brand?.name}
          </p>
          <p className="text-large text-[#616161] font-semibold">
            {product?.name}
          </p>
          <div className="flex gap-1">
            <p className="text-medium text-primary">{convertedPrice} {currency}</p>
            <p className="text-medium text-primary">
              {product?.paymentCurrency}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex text-extraSmall gap-1">
                <label htmlFor="items"> الأحجام المتوفرة:  </label>
                {
                  product?.packageSize.map((items , idx)=>(

                    <p key={idx}>{items},</p>
                  ))
                }
              </div>
      {isPending ? (
        <Loading width="15" height="15" />
      ) : (
        product?.sold === -1 ? <p>نفذت الكمية</p> : <button
          onClick={() => addProductToCart(product?._id, 1)}
          className="w-full text-small md:text-medium shadow-btn my-2 bg-white text-primary font-bold py-0.5 rounded-md flex justify-center items-center gap-2 border"
        >
          <LuShoppingBag /> اضافة الى السلة
        </button>
      )}
    </div>
  );
};

export default ProductCard;