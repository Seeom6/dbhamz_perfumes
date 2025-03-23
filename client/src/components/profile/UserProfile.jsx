import React from "react";
import { IoPerson ,IoLocationSharp , IoCall ,IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";


const UserProfile = ({ user }) => {
  return (
    <div className="w-full flex items-center justify-between space-x-4 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center items-center gap-2 md:gap-5">
        {
          !user.image? <CgProfile className="text-[50px] text-primary md:text-[100px]"/> : <img src="" alt="" />
        }
        
        <div className=" flex flex-col gap-2 justify-between ">
          <div className="w-fit flex gap-3 text-small md:text-large font-bold">
            <IoPerson/>
            <p>{user?.firstName}</p>
          </div>
          <div className="w-fit flex gap-3 text-small md:text-large text-[#787878]">
            <IoLocationSharp/>
            <p>{user?.address}</p>
          </div>
          <div className="w-fit flex gap-3 text-small md:text-large text-[#787878]">
            <IoCall/>
            <p>{user?.phone}</p>
          </div>
        </div>
      </div>
      <div>
      <IoSettings size={25}/> 
      </div>
    </div>
  );
};

export default UserProfile;