import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingCart, FiUsers, FiActivity } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';

import { formatCurrency } from './../../utils/FormatCurrency';
import Loading from './../Loading';

const StatesCard = ({ title, value, change, trend, icon, loading }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 relative overflow-hidden"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-indigo-50 opacity-30"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {icon}
          </div>
        </div>
        {loading ? (
          <div className="mt-4 h-8 flex items-center">
            <Loading width={8} height={8} color="#4f46e5" />
          </div>
        ) : (
          <>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
            <div className={`mt-2 flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
              {change}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default StatesCard