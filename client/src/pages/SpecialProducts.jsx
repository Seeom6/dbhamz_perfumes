import React from 'react'
import perfumeSpecial from "/assets/perfumeSpecial.png"
import HeaderImage from '../components/HeaderImage'
import GetSpecialProducts from '../components/featuredComponents/GetSpecialProducts'
import { specialProducts } from './../utils/data.jsx';

const SpecialProducts = () => {
  return (
    <div className="w-full flex justify-center items-center">
    <div className="max-w-[1260px] w-full px-2.5 flex justify-between gap-4 ">
      <div className='lg:max-w-full w-full px-2.5 flex flex-col justify-start gap-4 mb-20'>
      <HeaderImage image={perfumeSpecial} title={"مختاراتنا المميزة لأذواق فريدة "}/>
      <GetSpecialProducts data={specialProducts}/>
      <GetSpecialProducts data={specialProducts}/>
      </div>
    </div>
  </div>
  )
}

export default SpecialProducts
