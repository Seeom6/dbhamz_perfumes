import { Link } from "react-router-dom";
import perfume6 from "/assets/best1.jpg";
import perfume7 from "/assets/best10.jpg";
import perfume9 from "/assets/best8.jpg";
const BrandOwner = () => {
  return (
    <div className="w-full flex justify-between items-center gap-1 lg:gap-8">
      <div className="brandsOwner">
        <img className="rounded-lg h-full w-full object-cover" src={perfume6} alt="" />
      </div>
      <div className="brandsOwner flex-col">
        <img className="rounded-lg w-full h-[75%] object-cover" src={perfume7} alt="" />
        <div className="w-full flex flex-col justify-between gap-1.5 items-center">
            <p className="titleText font-bold">افضل المنتجات</p>
            <Link to={'/products'} className="w-full text-center regularText bg-primary py-1 md:py-2  text-white rounded-xs md:rounded-lg"> تسوق الأن </Link>
        </div>
      </div>
      <div className="brandsOwner">
        <img className="rounded-lg h-full w-full object-cover" src={perfume9} alt="" />
      </div>
    </div>
  );
};

export default BrandOwner;
