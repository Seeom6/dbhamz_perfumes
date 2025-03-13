import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({products}) => {
  return (
    <div className='w-full flex justify-center'>
    <div className="container md:px-1">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2.5">
        {products?.map((product , idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductGrid;