import { IoIosMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useGetMe } from "../../utils/Api/AuthenticationEndPoint";

const DashboardHeader = ({ setSidebarOpen }) => {
  const { data: getMe, isError, error, isLoading } = useGetMe();
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
            <span className="text-lg lg:text-xl">مرحبا {getMe?.firstName}</span>
            <span className="text-xl lg:text-2xl">👋</span>
          </div>
        </div>

        <div className="relative w-full lg:w-auto">
          <FaSearch
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="بحث"
            className="w-full lg:w-64 pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
