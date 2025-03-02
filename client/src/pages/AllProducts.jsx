import React, { useState } from "react";
import HeaderImage from "../components/HeaderImage";
import aboutImage from "/assets/perfumeSpecial.png";
import ProductGrid from "./../components/product/ProductGrid";
import Filtration from "../components/Filtration";
import Loading from "../components/Loading";
import Error from "./../components/Error";
import FilterContentPopup from "./../components/popup/FilterContentPopup";
import { useAllProducts } from "./../utils/Api/ApiEndPoint";
import Pagination from "../components/featuredComponents/pagination";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [filters, setFilters] = useState({});

  // Fetch products with filters
  const { data: products, isError, error, isLoading, refetch } = useAllProducts(filters);

  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;

  const offset = currentPage * itemsPerPage;
  const currentData = products.slice(offset, offset + itemsPerPage);

  // Handle filter submission
  const handleFilterSubmit = (newFilters) => {
    setFilters(newFilters); // Update filter state
    refetch(); // Refetch products with the new filters
  };

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        {/* Filtration Component (Visible on Large Screens) */}
        <div className="max-w-[247px] w-full min-w-[200px] h-screen hidden lg:block">
          <Filtration onFilterSubmit={handleFilterSubmit} />
        </div>

        <div className="w-full flex flex-col gap-4">
          <HeaderImage image={aboutImage} title={"أرقى أنواع العطور"} />

          {/* Filter Button (Visible on Small Screens) */}
          <div className="w-full flex justify-center lg:hidden">
            <button
              onClick={() => setIsFilterPopupOpen(true)}
              className="w-4/5 h-10 rounded-lg text-white bg-primary"
            >
              فلتر
            </button>
          </div>

          {/* Product Grid */}
          <ProductGrid products={currentData} />
          <Pagination
            data={products}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageClick}
          />
        </div>
      </div>

      {/* Popup for Filtration (Visible on Small Screens) */}
      <FilterContentPopup
        isFilterPopupOpen={isFilterPopupOpen}
        setIsFilterPopupOpen={setIsFilterPopupOpen}
        onFilterSubmit={handleFilterSubmit}
      />
    </div>
  );
};

export default AllProducts;