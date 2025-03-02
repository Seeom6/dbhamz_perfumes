import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAddCart } from "../../utils/Api/CartEndPoint";
import { toast } from "react-toastify";
import Loading from "./../Loading";
import { useGetMe } from "../../utils/Api/AuthenticationEndPoint";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };
  const { mutate: addCart, isPending, error } = useAddCart();
  const {data : getMe} = useGetMe()
  const addProductToCart = (productId, quantity) => {
    if(!getMe) return toast.error("يجب عليك تسجيل اولاً")
    addCart(
      { productId, quantity },
      {
        onSuccess: () => {
          toast.success("تم أضافة المنتج للسلة");
        },
        onError: () => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <div className="shadow-regularShadow p-2 rounded-lg">
      <div onClick={() => handleClick(product?._id)}>
        {" "}
        <div className="w-full py-1 ">
          <img
            className="rounded-lg w-full h-full object-cover"
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
            <p className="text-medium text-primary">{product?.price}</p>
            <p className="text-medium text-primary">
              {product?.paymentCurrency}
            </p>
          </div>
        </div>
      </div>

      {isPending ? (
        <Loading width="15" height="15" />
      ) : 
        <button
        // disabled={getMe?.roles === "user" ?false  : true}
          onClick={() => addProductToCart(product?._id, 1)}
          className="w-full shadow-btn my-2 bg-white text-primary font-bold py-0.5 rounded-md flex justify-center items-center gap-2 border-2"
        >
          <LuShoppingBag />" اضافة الى السلة"
        </button>
      }
    </div>
  );
};

export default ProductCard;
