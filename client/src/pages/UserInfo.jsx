import React from "react";
import HeaderImage from "../components/HeaderImage";
import dbhamz from "/assets/dbhamz2.png";
import UserForm from "../components/featuredComponents/UserForm";

const UserInfo = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage image={dbhamz} title={" أكمل بياناتك ..."} />
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-5">
        
          <UserForm />
          <div className="w-full px-4 flex gap-2.5 flex-col justify-center items-center  rounded-xl ">
            <p className="text-2xl font-bold"> ملخص الطلب</p>
            <div className="w-full flex bg-fifed justify-between px-10 h-14 items-center">
              <p className="text-xl">تكلفة الطلب:</p>
              <p className="text-xl">$99</p>
            </div>
            <div className="w-full bg-fifed flex justify-between px-10 h-14 items-center">
              <p className="text-xl"> التوصيل:</p>
              <p className="text-xl">$99</p>
            </div>
            <div className="w-full bg-fifed flex justify-between px-10 h-14 items-center">
              <p className="text-xl"> الإجمالي: </p>
              <p className="text-xl">$99</p>
            </div>
            <button className="w-full py-2 md:py-4 bg-primary rounded-lg text-white font-bold">
            إتمام الطلب{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
