import React from 'react';
import { NavLink } from 'react-router-dom';
import { dashboardLinks } from './../../utils/data';

const LeftSidebar = ({ setSidebarOpen }) => {
  return (
    <div className="h-full bg-white shadow-md flex flex-col border-r border-gray-200 w-64">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">لوحة التحكم</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={(e)=>{setSidebarOpen(false)}}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <span className="ml-2">{link.icon}</span>
            <span className="mr-2">{link.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white">
            م
          </div>
          <div className="mr-2">
            <p className="text-sm font-medium">مدير النظام</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;