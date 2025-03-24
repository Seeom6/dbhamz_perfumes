import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';

const DashboardHeader = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="relative w-full max-w-md">
        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="بحث..."
          className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FiBell className="text-gray-600" />
          <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;