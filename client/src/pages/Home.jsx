import AboutUs from "../components/AboutUs";
import BrandOwner from "../components/BrandOwner";
import GetSpecialProducts from "../components/featuredComponents/GetSpecialProducts";
import Perfumes from "../components/Perfumes";
import StaticBrands from "../components/StaticBrands";
import Swiper from "../components/Swiper";
import { specialProducts } from "../utils/data.jsx";
import Loading from "../components/Loading.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import { useContext, useEffect, useState } from "react";
import { useAllProducts } from "../utils/Api/ApiEndPoint.js";
import { Context } from "../context/StatContext.jsx";
import CurrencyPopup from "../components/popup/CurrencyPopup.jsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [itemsToShow, setItemsToShow] = useState(14); // Changed from pagination to load more
  const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);
  const { AllProducts, isAllProLoad, currency, updateCurrency, isAllProductError } = useContext(Context);

  const {
    data: specialProducts,
    isError,
    isLoading,
  } = useAllProducts({ isLike: true });

  const currentData = AllProducts?.slice(0, itemsToShow);
  const totalItems = AllProducts?.length || 0;
  const hasMoreItems = itemsToShow < totalItems;

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

  const handleSeeMore = () => {
    setItemsToShow(prev => Math.min(prev + 10, totalItems));
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] mt-[80px] md:mt-[115px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <Swiper />
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
                  <ProductGrid products={currentData} />
                  
                  {/* Replaced pagination with load more functionality */}
                  <div className="flex flex-col items-center gap-4 mt-8">
                    <div className="text-gray-600 text-sm">
                      عرض <span className="font-bold text-primary">{Math.min(itemsToShow, totalItems)}</span> من أصل <span className="font-bold text-primary">{totalItems}</span> منتج
                    </div>
                    
                    {hasMoreItems && (
                      <button
                        onClick={handleSeeMore}
                        className="px-6 py-3 bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                      >
                        <span>عرض المزيد</span>
                        <ChevronDownIcon className="h-5 w-5" />
                      </button>
                    )}

                    {!hasMoreItems && totalItems > 0 && (
                      <div className="text-gray-500 text-sm py-2">
                        لقد وصلت إلى نهاية القائمة
                      </div>
                    )}
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