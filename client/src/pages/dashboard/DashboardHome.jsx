import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({ title, value, change, trend }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
          {change}
        </div>
      </div>
    </motion.div>
  );
};

const DashboardHome = () => {
  const stats = [
    { title: 'إجمالي الإيرادات', value: '12,345 د.ك', change: '+12%', trend: 'up' },
    { title: 'طلبات جديدة', value: '154', change: '+5%', trend: 'up' },
    { title: 'عملاء نشطين', value: '892', change: '-3%', trend: 'down' },
    { title: 'معدل التحويل', value: '3.2%', change: '+0.5%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-800"
      >
        نظرة عامة
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">النشاط الأخير</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <div className="w-5 h-5 text-indigo-600">•</div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">تم إنشاء طلب جديد #{1000 + item}</p>
                <p className="text-xs text-gray-500 mt-1">منذ {item} ساعة</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;