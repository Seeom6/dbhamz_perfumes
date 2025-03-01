import React from 'react'

const HeaderImage = (props) => {
  return (
    <div className='w-full h-32 md:h-56 flex justify-center items-center relative'>
      <span className=' w-full absolute z-10 h-full bg-black opacity-60 rounded-2xl'></span>
      <img className='h-full w-full object-cover rounded-2xl flex z-0' src={props.image} alt="" />
      <p className="regularText text-center text-primary font-semibold z-20 absolute">{props.title}</p>
    </div>
  )
}

export default HeaderImage
