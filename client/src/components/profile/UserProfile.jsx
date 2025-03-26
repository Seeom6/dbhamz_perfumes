import React from "react";
import { IoPerson, IoLocationSharp, IoCall, IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const UserProfile = ({ user }) => {
  // Format the address if it exists and is an object
  const formattedAddress = user?.address
    ? `${user.address.street || ''}, ${user.address.area || ''}, ${user.address.city || ''}, ${user.address.country || ''}`
    : 'No address provided';

  return (
    <div className="w-full flex items-center justify-between space-x-4 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center items-center gap-2 md:gap-5">
        {!user?.image ? (
          <CgProfile className="text-[50px] text-primary md:text-[100px]" />
        ) : (
          <img src={user.image} alt="Profile" className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full object-cover" />
        )}
        
        <div className="flex flex-col gap-2 justify-between">
          <div className="w-fit flex gap-3 text-sm md:text-base font-bold items-center">
            <IoPerson className="text-primary" />
            <p>{user?.firstName} {user?.lastName}</p>
          </div>
          <div className="w-fit flex gap-3 text-sm md:text-base text-gray-600 items-center">
            <IoLocationSharp className="text-primary" />
            <p>{formattedAddress}</p>
          </div>
          <div className="w-fit flex gap-3 text-sm md:text-base text-gray-600 items-center">
            <IoCall className="text-primary" />
            <p>{user?.phone || 'No phone provided'}</p>
          </div>
        </div>
      </div>
      <div className="text-primary hover:text-secondary cursor-pointer">
        <IoSettings size={25} />
      </div>
    </div>
  );
};

export default UserProfile;