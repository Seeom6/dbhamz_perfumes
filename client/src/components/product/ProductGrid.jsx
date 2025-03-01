import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({products}) => {
  return (
    <div className='w-full flex justify-center'>
    <div className="container px-7 md:px-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product , idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductGrid;