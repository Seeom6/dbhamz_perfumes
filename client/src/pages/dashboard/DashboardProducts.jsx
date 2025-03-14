import React, { useContext, useState, useEffect } from "react";
import ProductTable from "../../components/dashboardComponents/ProductTable";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Pagination from "./../../components/featuredComponents/pagination";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/StatContext";

const DashboardProducts = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { AllProducts, allProError, isAllProLoad, isAllProductError } = useContext(Context);
  const itemsPerPage = 9;

  // Filter products based on search query
  const filteredProducts = AllProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentData = filteredProducts.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Debounce search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(0); // Reset to the first page when searching
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Conditional rendering after all hooks
  if (isAllProLoad) return <Loading elements={"h-screen"} />;
  if (isAllProductError) return <Error error={allProError} />;

  return (
    <div className="w-full flex flex-col mb-6 justify-start items-start gap-5">
      <button
        onClick={() => navigate("/dashboard/add-product")}
        className="w-44 h-11 text-medium bg-[#0F5FC2] rounded-lg text-white font-bold"
      >
        اضافة منتج
      </button>

      {/* Search Input */}
      <div className="w-full flex justify-end mb-4">
        <input
          type="text"
          placeholder="بحث عن منتج"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full lg:w-64 pr-4 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="w-full flex flex-col items-start">
        <ProductTable products={currentData} />
        <div className="w-full flex justify-end">
          <Pagination
            data={filteredProducts} // Use filteredProducts for pagination
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