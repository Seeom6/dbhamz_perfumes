import { IoIosMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../../context/StatContext";

const DashboardHeader = ({ setSidebarOpen }) => {
 const {userData} = useContext(Context)
  return (
    <div className="w-full ">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6 lg:mb-8">
        <div className="w-full flex justify-between">
          <button
            className="lg:hidden self-end text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <IoIosMenu size={24} />
          </button>{" "}
          <div className="flex items-center gap-2">
            <span className="text-lg lg:text-xl">مرحبا {userData?.firstName}</span>
            <span className="text-xl lg:text-2xl">👋</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHeader;
