import AboutUs from "../components/AboutUs";
import BrandOwner from "../components/BrandOwner";
import Pagination from "../components/featuredComponents/pagination";
import GetSpecialProducts from "../components/featuredComponents/GetSpecialProducts";
import Perfumes from "../components/Perfumes";
import StaticBrands from "../components/StaticBrands";
import Swiper from "../components/Swiper";

import { specialProducts } from "../utils/data.jsx";

import Loading from "../components/Loading.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import { useState } from "react";
import { useAllProducts } from "../utils/Api/ApiEndPoint.js";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const { data: myData, isError, error, isLoading } = useAllProducts();
  
  // if (isLoading) return <Loading elements={"h-screen"} />;
  // if (isError) return <Error error={error} />;

      const offset = currentPage * itemsPerPage;
  const currentData = myData?.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
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
          <div className="w-full">
            <GetSpecialProducts data={specialProducts} />
          </div>
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
          {isLoading ? (
            <Loading />
          ) : (
            !isError &&
            <div className="w-full ">
              <div className="w-full">
                <ProductGrid products={currentData} />
                <Pagination
                  data={myData}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageClick}
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          <AboutUs text="home" />
        </div>
      </div>
    </div>
  );
};

export default Home;
