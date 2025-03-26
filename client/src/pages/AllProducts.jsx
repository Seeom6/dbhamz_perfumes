import React, { useState, useEffect } from "react";
import HeaderImage from "../components/HeaderImage";
import aboutImage from "/assets/perfumeSpecial.png";
import ProductGrid from "./../components/product/ProductGrid";
import Filtration from "../components/Filtration";
import Loading from "../components/Loading";
import Error from "./../components/Error";
import FilterContentPopup from "./../components/popup/FilterContentPopup";
import { useAllProducts } from "./../utils/Api/ApiEndPoint";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const AllProducts = () => {
  const [itemsToShow, setItemsToShow] = useState(14);
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get('brand');
  const navigate = useNavigate();

  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [activeBrand, setActiveBrand] = useState(null);

  // Initialize filters with brandId if it exists in URL
  useEffect(() => {
    if (brandId) {
      setFilters(prev => ({ ...prev, brand: brandId }));
      setActiveBrand(brandId);
    } else {
      setActiveBrand(null);
    }
  }, [brandId]);

  // Reset items to show when filters change
  useEffect(() => {
    setItemsToShow(14);
  }, [filters]);

  // Fetch products with filters
  const { data: products, isError, error, isLoading, refetch } = useAllProducts(filters);

  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;

  const currentData = products?.slice(0, itemsToShow);
  const totalItems = products?.length || 0;
  const hasMoreItems = itemsToShow < totalItems;

  // Handle filter submission
  const handleFilterSubmit = (newFilters) => {
    const updatedFilters = activeBrand 
      ? { ...newFilters, brand: activeBrand }
      : newFilters;
    
    setFilters(updatedFilters);
    refetch();
  };

  // Handle clearing brand filter
  const handleClearBrandFilter = () => {
    const newFilters = { ...filters };
    delete newFilters.brand;
    setFilters(newFilters);
    setActiveBrand(null);
    navigate('/products');
    refetch();
  };

  // Load more items
  const handleSeeMore = () => {
    setItemsToShow(prev => Math.min(prev + 10, totalItems));
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] mt-[80px] md:mt-[115px] w-full px-2.5 flex justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        {/* Filtration Component (Visible on Large Screens) */}
        <div className="max-w-[247px] w-full min-w-[200px] h-screen hidden lg:block">
          <Filtration 
            onFilterSubmit={handleFilterSubmit} 
            initialBrandFilter={activeBrand}
            onClearBrandFilter={handleClearBrandFilter}
          />
        </div>

        <div className="w-full flex flex-col gap-4">
          <HeaderImage image={aboutImage} title={"أرقى أنواع العطور"} />

          {/* Show active brand filter if present */}
          {activeBrand && (
            <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-900 p-4 flex justify-between items-center rounded-lg">
              <p className="font-arabic">عرض المنتجات للماركة المحددة</p>
              <button 
                onClick={handleClearBrandFilter}
                className="text-amber-700 hover:text-amber-900 font-bold"
              >
                إزالة الفلتر
              </button>
            </div>
          )}

          {/* Filter Button (Visible on Small Screens) */}
          <div className="w-full flex justify-center lg:hidden">
            <button
              onClick={() => setIsFilterPopupOpen(true)}
              className="w-4/5 h-10 rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <span>فلتر المنتجات</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Product Grid */}
          <ProductGrid products={currentData} />

          {/* Items Count and See More Button */}
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

      {/* Popup for Filtration (Visible on Small Screens) */}
      <FilterContentPopup
        isFilterPopupOpen={isFilterPopupOpen}
        setIsFilterPopupOpen={setIsFilterPopupOpen}
        onFilterSubmit={handleFilterSubmit}
        initialBrandFilter={activeBrand}
      />
    </div>
  );
};

export default AllProducts;