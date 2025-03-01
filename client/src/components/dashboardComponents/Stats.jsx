import React from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { LuMonitorCheck } from "react-icons/lu";


const Stats = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-1 text-sm lg:text-base">
                عدد الزبائن
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold">5,423</h3>
              <div className="flex items-center gap-1 text-green-500 mt-2">
                <FiArrowUpRight size={16} />
                <span className="text-xs lg:text-sm">16% this month</span>
              </div>
            </div>
            <div className="bg-green-100 p-2 lg:p-3 rounded-full">
              <FaRegUserCircle className="text-green-600 w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-1 text-sm lg:text-base">
                الطلبات المنفذة
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold">1,893</h3>
              <div className="flex items-center gap-1 text-red-500 mt-2">
                <FiArrowDownRight size={16} />
                <span className="text-xs lg:text-sm">1% this month</span>
              </div>
            </div>
            <div className="bg-blue-100 p-2 lg:p-3 rounded-full">
              <FaRegUserCircle className="text-blue-600 w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-1 text-sm lg:text-base">
                عدد الزيارات
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold">189</h3>
              <div className="flex items-center gap-1 text-green-500 mt-2">
                <FiArrowUpRight size={16} />
                <span className="text-xs lg:text-sm">12% this month</span>
              </div>
            </div>
            <div className="bg-purple-100 p-2 lg:p-3 rounded-full">
              <LuMonitorCheck className="text-purple-600 w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
