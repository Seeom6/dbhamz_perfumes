import React from 'react'
import logo from "../assets/logo.png"
import { navLink, NotAccessRoute } from '../utils/data.jsx'
import { useLocation } from 'react-router-dom';
const Footer = () => {
  const pathname = useLocation().pathname;
  return (
    <div className={`${NotAccessRoute.includes(pathname) ? "hidden" : ''} w-full flex justify-center flex-col b items-center`}>
        <div className='max-w-[1240px] w-full bg-primary p-20 flex justify-between items-center'>
      <div>
        <img src={logo} alt="" />
      </div>
      <div>
        <p className='font-bold text-[22px] '>الأقسام</p>
        {
            navLink.map((item)=>(
                <p key={item.href} className='text-ford text-medium leading-8'>
                    {item.name}
                </p>
            ))
        }
      </div>
      <div>
      <p className='font-bold text-[22px]'>تواصل معنا</p>
        {
            navLink.map((item)=>(
                <p key={item.href} className='text-ford text-medium leading-8'>
                    {item.name}
                </p>
            ))
        }
      </div>
      <div>
      <p className='font-bold text-[22px]'>تابعنا</p>
        {
            navLink.map((item)=>(
                <p key={item.href} className='text-ford text-medium leading-8'>
                    {item.name}
                </p>
            ))
        }
      </div>
 
    </div>
    <div className='bg-primary max-w-[1240px] w-full border-t-2 border-ford text-center font-bold text-medium'>
    جميع الحقوق محفوظة لمتجر ديبهامز 2025
      </div>
    </div>
  )
}

export default Footer
