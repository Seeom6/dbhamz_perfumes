import AboutUs from "../components/AboutUs";
import BrandOwner from "../components/BrandOwner";
import GetSpecialProducts from "../components/featuredComponents/GetSpecialProducts";
import Perfumes from "../components/Perfumes";
import StaticBrands from "../components/StaticBrands";
import OffersCarousel from "../components/OffersCarousel.jsx";
import Loading from "../components/Loading.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import { useContext, useEffect, useState } from "react";
import { useAllProducts } from "../utils/Api/ApiEndPoint.js";
import { Context } from "../context/StatContext.jsx";
import CurrencyPopup from "../components/popup/CurrencyPopup.jsx";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);
  const {
    AllProducts,
    isAllProLoad,
    currency,
    updateCurrency,
    isAllProductError,
  } = useContext(Context);
  const navigate = useNavigate();

  const {
    data: specialProducts,
    isError,
    isLoading,
  } = useAllProducts({ isLike: true });

  useEffect(() => {
    const selectedCurrency = localStorage.getItem("selectedCurrency");
    if (!selectedCurrency) {
      setShowCurrencyPopup(true);
    }
  }, []);

  const handleCurrencySelect = (selectedCurrency) => {
    updateCurrency(selectedCurrency);
    localStorage.setItem("selectedCurrency", selectedCurrency);
    setShowCurrencyPopup(false);
  };

  const handleViewAllProducts = () => {
    navigate("/products"); // Navigate to products page
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] mt-[40px] md:mt-0 w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <OffersCarousel />
        <StaticBrands />
        <BrandOwner />
        <div className="w-full flex flex-col relative justify-center items-center gap-8">
          <div className="w-full flex justify-center relative">
            <span className="absolute w-full h-0.5 md:h-1 left-0 top-[12px] lg:top-7 bg-ford"></span>
            <p className="titleText z-10 font-bold px-5 bg-white text-ford">
              المنتجات المميزة
            </p>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            !isError && (
              <div className="w-full ">
                <GetSpecialProducts data={specialProducts} />
              </div>
            )
          )}
        </div>
        <div className="w-full flex flex-col relative justify-center items-center gap-8">
          <div className="w-full flex justify-center relative">
            <span className="absolute w-full h-0.5 md:h-1 left-0 top-[12px] lg:top-7 bg-primary"></span>
            <p className="titleText z-10 font-bold px-5 bg-white text-primary">
              اخترنا لك
            </p>
          </div>
          <div className="w-full">
            <Perfumes />
          </div>
        </div>
        <div className="w-full flex flex-col relative justify-center items-center gap-8">
          <div className="w-full flex justify-center relative">
            <span className="absolute w-full h-0.5 md:h-1 left-0 top-[12px] lg:top-7 bg-primary"></span>
            <p className="titleText z-10 font-bold px-5 bg-white text-primary">
              جميع المنتجات
            </p>
          </div>
          {isAllProLoad ? (
            <Loading />
          ) : (
            !isAllProductError && (
              <div className="w-full">
                <div className="w-full">
                  <ProductGrid products={AllProducts?.slice(0, 14)} />

                  <div className="flex flex-col items-center gap-4 mt-8">
                    <button
                      onClick={handleViewAllProducts}
                      className="px-6 py-3 bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <span>عرض جميع المنتجات</span>
                      <FaAngleDown className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="w-full">
          <AboutUs text="home" />
        </div>
      </div>
      <CurrencyPopup
        isOpen={showCurrencyPopup}
        onClose={() => setShowCurrencyPopup(false)}
        onCurrencySelect={handleCurrencySelect}
      />
    </div>
  );
};

export default Home;
