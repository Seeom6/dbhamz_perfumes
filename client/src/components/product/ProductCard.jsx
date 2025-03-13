import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAddCart } from "../../utils/Api/CartEndPoint";
import { toast } from "react-toastify";
import Loading from "./../Loading";
import { addToLocalStorageCart } from "../../utils/localStorageCart";
import { convertCurrency } from "../../utils/currency.js";
import { useContext } from "react";
import { Context } from "../../context/StatContext.jsx";

const ProductCard = ({ product }) => {
  const { currency, isAddCartLoading, onAdd } = useContext(Context);
  const convertedPrice = convertCurrency(product?.price, "KWD", currency);
  const convertedPriceAfterDiscount = convertCurrency(
    product?.priceAfterDiscount,
    "KWD",
    currency
  );
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="shadow-regularShadow flex items-center flex-col justify-between p-2 rounded-lg">
      <div onClick={() => handleClick(product?._id)}>
        <div className="w-full py-1">
          <img
            className="rounded-lg w-full bg-white shadow-xl h-full object-cover"
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
            {/* Display price with or without discount */}
            {product?.priceAfterDiscount ? (
              <div className="flex flex-col">
                <p className="text-medium text-red-500 line-through">
                  {convertedPrice} {currency}
                </p>
                <p className="text-medium text-primary">
                  {convertedPriceAfterDiscount} {currency}
                </p>
              </div>
            ) : (
              <p className="text-medium text-primary">
                {convertedPrice} {currency}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex text-extraSmall gap-1">
        <label htmlFor="items"> الأحجام المتوفرة: </label>
        {product?.packageSize.map((items, idx) => (
          <p key={idx}>{items},</p>
        ))}
      </div>
      {isAddCartLoading ? (
        <Loading width="15" height="15" />
      ) : (
        <button
          onClick={() => onAdd(product, 1)}
          className="w-full text-small md:text-medium shadow-btn my-2 bg-white text-primary font-bold py-0.5 rounded-md flex justify-center items-center gap-2 border"
        >
          <LuShoppingBag /> اضافة الى السلة
        </button>
      )}
    </div>
  );
};

export default ProductCard;
