import React, { useState } from "react";
import ProductTable from "../../components/dashboardComponents/ProductTable";
import { useAllProducts } from "./../../utils/Api/ApiEndPoint";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Pagination from "./../../components/featuredComponents/pagination";
import { useNavigate } from "react-router-dom";

const DashboardProducts = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 9;
  const { data: products, error, isError, isLoading } = useAllProducts();

  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;

  const offset = currentPage * itemsPerPage;
  const currentData = products.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="w-full flex flex-col mb-6 justify-start items-start gap-5">
      <button onClick={()=> navigate("/dashboard/add-product")} className="w-44 h-11 text-medium bg-[#0F5FC2] rounded-lg text-white font-bold">
        {/* {isPending ? <Loading/> : "حفظ"} */}
        اضافة منتج
      </button>
      <div className="w-full flex flex-col items-start">
        <ProductTable products={currentData} />
        <div className="w-full flex justify-end">
          <Pagination
            data={products}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageClick}
          />

        </div>
      </div>
    </div>
  );
};

export default DashboardProducts;
