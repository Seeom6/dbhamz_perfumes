import React from 'react';
import perfumeSpecial from "/assets/best6.jpg";
import HeaderImage from '../components/HeaderImage';
import { useAllProducts } from './../utils/Api/ApiEndPoint';
import Loading from '../components/Loading.jsx';
import Error from '../components/Error.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';

const SpecialProducts = () => {
  const filters = { isLike: true };
  const { data: products, isError, error, isLoading, refetch } = useAllProducts(filters);

  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] mt-[40px] md:mt-0 w-full px-2.5 flex justify-between gap-4 ">
        <div className='lg:max-w-full w-full px-2.5 flex flex-col justify-start gap-4 mb-20'>
          <HeaderImage image={perfumeSpecial} title={"مختاراتنا المميزة لأذواق فريدة "} />
          <ProductGrid products={products} />

        </div>
      </div>
    </div>
  );
};

export default SpecialProducts;