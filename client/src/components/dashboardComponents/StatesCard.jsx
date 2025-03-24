import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({ title, value, icon, trend, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm font-medium ${
        trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
      }`}>
        {trend === 'up' ? (
          <FiTrendingUp className="mr-1" />
        ) : trend === 'down' ? (
          <FiTrendingDown className="mr-1" />
        ) : null}
        {change}
        <span className="text-gray-500 ml-1">vs last month</span>
      </div>
    </div>
  );
};

export default StatsCard;