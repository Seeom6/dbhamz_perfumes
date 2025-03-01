import perfume6 from "../assets/perfume6.png";
import perfume7 from "../assets/perfume7.png";
import perfume9 from "../assets/perfume9.png";
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
            <button className="w-full regularText bg-primary py-1 md:py-2  text-white rounded-xs md:rounded-lg"> تسوق الأن </button>
        </div>
      </div>
      <div className="brandsOwner">
        <img className="rounded-lg h-full w-full object-cover" src={perfume9} alt="" />
      </div>
    </div>
  );
};

export default BrandOwner;
