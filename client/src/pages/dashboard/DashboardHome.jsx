import { useGetOrders } from "../../utils/Api/OrderEndPoint";
import { useGetUsers } from "../../utils/Api/UserEndPoint";
import {  FiDollarSign, FiShoppingCart, FiUsers, FiActivity } from 'react-icons/fi';
import { formatCurrency } from './../../utils/FormatCurrency';
import { motion } from 'framer-motion';
import StatesCard from "../../components/dashboardComponents/StatesCard"
import Loading from "../../components/Loading";


const RecentActivityItem = ({ order, users }) => {
  const customer = users?.find(user => user._id === order.user) || {};
  return (
    <div className="flex items-start pb-4 border-b border-gray-100 last:border-0">
      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
        <FiShoppingCart className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">
          طلب جديد #{order._id.slice(-6).toUpperCase()} 
          <span className="text-gray-500 ml-2">بواسطة {customer.name || 'مستخدم'}</span>
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleDateString('ar-KW')}
          </p>
          <p className="text-xs font-medium text-indigo-600">
            {formatCurrency(order.totalOrderPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};




const DashboardHome = () => {
  // Fetch real data
  const { data: orders, isLoading: ordersLoading } = useGetOrders();
  const { data: users, isLoading: usersLoading } = useGetUsers();
  
  // Calculate stats from real data
  const totalRevenue = orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;
  const newOrdersCount = orders?.filter(order => {
    const orderDate = new Date(order.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return orderDate > weekAgo;
  }).length || 0;
  
  const activeUsersCount = users?.length || 0;
  const conversionRate = orders?.length > 0 ? ((orders.length / activeUsersCount) * 100).toFixed(1) : 0;
  
  // Recent orders (last 5)
  const recentOrders = orders?.slice(0, 5).reverse() || [];

  const stats = [
    { 
      title: 'إجمالي الإيرادات', 
      value: formatCurrency(totalRevenue), 
      change: '+12%', 
      trend: 'up',
      icon: <FiDollarSign className="w-4 h-4" />,
      loading: ordersLoading
    },
    { 
      title: 'طلبات جديدة', 
      value: newOrdersCount, 
      change: '+5%', 
      trend: 'up',
      icon: <FiShoppingCart className="w-4 h-4" />,
      loading: ordersLoading
    },
    { 
      title: 'عملاء نشطين', 
      value: activeUsersCount, 
      change: '-3%', 
      trend: 'down',
      icon: <FiUsers className="w-4 h-4" />,
      loading: usersLoading
    },
    { 
      title: 'معدل التحويل', 
      value: `${conversionRate}%`, 
      change: '+0.5%', 
      trend: 'up',
      icon: <FiActivity className="w-4 h-4" />,
      loading: ordersLoading || usersLoading
    }
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
          <StatesCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            loading={stat.loading}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">آخر الطلبات</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800">
            عرض الكل
          </button>
        </div>
        
        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <Loading width={10} height="10" color="#4f46e5" />
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <RecentActivityItem key={order._id} order={order} users={users} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">لا توجد طلبات حديثة</p>
            )}
          </div>
        )}
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">أداء المبيعات</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">رسم بياني للمبيعات سيظهر هنا</p>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;