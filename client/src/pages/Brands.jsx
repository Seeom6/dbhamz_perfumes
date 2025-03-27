import React, { useState } from 'react';
import { useAllBrands } from "../utils/Api/BrandEndPoint";
import { useNavigate } from 'react-router-dom';
import image from "/assets/best5.jpg"
import HeaderImage from '../components/HeaderImage';

const Brands = () => {
  const { data: brands, error, isError, isLoading } = useAllBrands();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>Error loading brands: {error.message}</p>
      </div>
    );
  }

  // Filter and sort brands
  const filteredBrands = brands
    ?.filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ?.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const handleBrandClick = (brandId) => {
    navigate(`/products?brand=${brandId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-[0px] md:mt-0">
        <HeaderImage
          image={image}
          title={"استكشف عطورنا الفريدة واختر ما يناسبك"}
        />
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-900 sm:text-4xl font-arabic">
            الماركات
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-amber-700 sm:mt-4 font-arabic">
            استكشف الماركات التي نعمل معها
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-amber-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pr-10 pl-3 py-2 border border-amber-300 rounded-lg leading-5 bg-white placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-right font-arabic"
              placeholder="ابحث عن الماركات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <span className="ml-2 text-sm font-medium text-amber-700 font-arabic">ترتيب:</span>
            <select
              className="block w-full pr-3 pl-10 py-2 text-base border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-lg text-right font-arabic"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">أ-ي</option>
              <option value="desc">ي-أ</option>
            </select>
          </div>
        </div>

        {/* Brands Grid */}
        {filteredBrands?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => handleBrandClick(brand._id)}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-center h-40 relative">
                    {brand.image ? (
                      <>
                        <img 
                          src={brand.image} 
                          alt={brand.name}
                          className="h-full w-full object-contain p-2 transition-opacity duration-300 group-hover:opacity-90"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = '';
                            e.target.parentElement.innerHTML = `
                              <div class="flex items-center justify-center w-full h-full bg-amber-50 rounded-lg">
                                <span class="text-3xl font-bold text-amber-700">
                                  ${brand.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            `;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-amber-50 rounded-lg">
                        <span className="text-3xl font-bold text-amber-700">
                          {brand.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-center text-amber-900 font-arabic group-hover:text-amber-700 transition-colors duration-300">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm p-8">
            <svg
              className="mx-auto h-16 w-16 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-amber-900 font-arabic">لا توجد ماركات</h3>
            <p className="mt-2 text-sm text-amber-700 font-arabic">
              {searchTerm ? 'حاول تعديل بحثك أو الفلتر' : 'لا توجد ماركات متاحة حالياً'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;