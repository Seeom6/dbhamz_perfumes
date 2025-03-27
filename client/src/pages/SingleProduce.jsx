import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useGetProduct, useSimilarProduct } from "../utils/Api/ApiEndPoint.js";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import ProductInfo from "../components/product/ProductInfo.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import Pagination from "./../components/featuredComponents/pagination";

const SingleProduce = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const {
    isError,
    data: singleProduct,
    error,
    isLoading,
  } = useGetProduct(params.id);

  const { data: similarData, isLoading: loadingSimilar } = useSimilarProduct(
    singleProduct?.brand?._id
  );

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries(["similarProduct", "product"]);
  };

  useEffect(() => {
    handleRefresh();
  }, [params]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch product details.");
    }
  }, [isError, error]);

  if (isLoading || loadingSimilar) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;

  const offset = currentPage * itemsPerPage;
  const currentData = similarData.slice(offset, offset + itemsPerPage);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] mt-[40px] md:mt-0 w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <ProductInfo data={singleProduct} />
        <div className="w-full flex justify-start relative">
          <span className="absolute w-full h-0.5 md:h-1 left-0 top-[12px] lg:top-7 bg-primary"></span>
          <p className="titleText z-10 font-bold px-5 bg-white text-primary">
            المنتجات المشابهة{" "}
          </p>
        </div>
        <ProductGrid products={currentData} />
        <Pagination
          data={similarData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default SingleProduce;
