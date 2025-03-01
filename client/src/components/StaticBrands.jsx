import React from 'react'
import { Brands } from '../utils/data.jsx'

const StaticBrands = () => {
  return (
    <div className='w-full flex h-12 sm:h-20 md:h-24 bg-primary rounded-br-[24px] md:rounded-br-[48px] rounded-bl-[24px] md:rounded-bl-[48px] justify-between items-center px-7 md:px-12'>
      {
        Brands.map((item , idx)=>(
            <div key={idx} className='w-11 sm:w-16 md:w-28 '>
                <img src={item.img} alt="" />
            </div>
        ))
      }
    </div>
  )
}

export default StaticBrands
