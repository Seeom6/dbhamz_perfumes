import React, { useState } from "react";
import BrandTable from "../../components/dashboardComponents/BrandTable";
import Loading from "../../components/Loading";
import { useAllBrands } from "../../utils/Api/BrandEndPoint";
import Pagination from './../../components/featuredComponents/pagination';
import { useNavigate } from 'react-router-dom';

const DashboardBrand = () => {

  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 9;
  const { data: brands, error, isError, isLoading } = useAllBrands();

  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;

  const offset = currentPage * itemsPerPage;
  const currentData = brands.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col mb-6 justify-start items-start gap-5">
        <button onClick={()=>navigate("/dashboard/brands/add")} className="w-44 h-11 text-medium bg-[#0F5FC2] rounded-lg text-white font-bold">
          {/* {isPending ? <Loading/> : "حفظ"} */}
          اضافة ماركة
        </button>
        <div className="w-full flex flex-col items-start">
          <BrandTable brands={currentData} />
          <div className="w-full flex justify-end">
            <Pagination
              data={brands}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBrand;
