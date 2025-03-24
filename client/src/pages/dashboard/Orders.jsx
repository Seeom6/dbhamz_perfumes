import React, { useState } from 'react';
import { useGetOrders } from '../../utils/Api/OrderEndPoint';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { FiSearch, FiFilter, FiEye, FiPrinter, FiDownload, FiX, FiChevronDown } from 'react-icons/fi';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { convertCurrency } from '../../utils/currency';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = () => {
  const { data: orders, isLoading, isError, error } = useGetOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (isLoading) return <Loading elements="h-screen" />;
  if (isError) return <Error error={error} />;

  // Filter orders based on search and status
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingData?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingData?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingData?.phone?.includes(searchTerm);

    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'paid' && order.isPaid) ||
      (statusFilter === 'unpaid' && !order.isPaid) ||
      (statusFilter === 'delivered' && order.isDelivered) ||
      (statusFilter === 'undelivered' && !order.isDelivered);

    return matchesSearch && matchesStatus;
  });

  // Format date
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ar });
  };

  // Calculate order status
  const getOrderStatus = (order) => {
    if (order.isDelivered) return 'تم التوصيل';
    if (order.isPaid) return 'تم الدفع';
    return 'قيد الانتظار';
  };

  // Status options
  const statusOptions = [
    { value: 'all', label: 'جميع الحالات', color: 'gray' },
    { value: 'paid', label: 'تم الدفع', color: 'green' },
    { value: 'unpaid', label: 'لم يتم الدفع', color: 'red' },
    { value: 'delivered', label: 'تم التوصيل', color: 'blue' },
    { value: 'undelivered', label: 'لم يتم التوصيل', color: 'yellow' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">إدارة الطلبات</h1>
            <p className="text-gray-600 mt-2">عرض وتتبع جميع طلبات العملاء</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {filteredOrders?.length || 0} طلب
            </span>
          </div>
        </motion.div>
        
        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن الطلبات..."
                className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative w-full md:w-auto">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full md:w-48 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <span className="flex items-center">
                  <FiFilter className="ml-2 text-gray-500" />
                  {statusOptions.find(opt => opt.value === statusFilter)?.label}
                </span>
                <FiChevronDown className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full md:w-48 bg-white rounded-lg shadow-lg border border-gray-100"
                  >
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setStatusFilter(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-right px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          statusFilter === option.value ? 'bg-primary/10 text-primary' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                        {statusFilter === option.value && (
                          <span className={`w-2 h-2 rounded-full bg-${option.color}-500`}></span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['رقم الطلب', 'العميل', 'التاريخ', 'الحالة', 'المبلغ', 'العمليات'].map((header, index) => (
                    <th 
                      key={index}
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders?.map((order) => (
                  <motion.tr 
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className="bg-gray-100 group-hover:bg-gray-200 px-2 py-1 rounded-md transition-colors">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                          {order.shippingData?.firstName?.charAt(0)}
                        </div>
                        <div className="mr-3">
                          <div className="font-medium">
                            {order.shippingData?.firstName} {order.shippingData?.lastName}
                          </div>
                          <div className="text-gray-500 text-xs">{order.shippingData?.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.isDelivered ? 'bg-green-100 text-green-800' : 
                          order.isPaid ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'} 
                        transition-colors`}>
                        {getOrderStatus(order)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className="font-bold">
                        {convertCurrency(order.totalOrderPriceAfterDiscount || order.totalOrderPrice, "KWD", "KWD")} KWD
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-primary hover:text-primary-dark mr-3 transition-colors flex items-center"
                      >
                        <FiEye className="ml-1" /> عرض
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredOrders?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <FiSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد طلبات</h3>
            <p className="text-gray-500">لم يتم العثور على أي طلبات تطابق معايير البحث الخاصة بك</p>
          </motion.div>
        )}

        {/* Order Details Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        تفاصيل الطلب #{selectedOrder._id.slice(-6).toUpperCase()}
                      </h2>
                      <p className="text-gray-500 mt-1">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Customer Info */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        معلومات العميل
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'الاسم', value: `${selectedOrder.shippingData?.firstName} ${selectedOrder.shippingData?.lastName}` },
                          { label: 'الهاتف', value: selectedOrder.shippingData?.phone },
                          { label: 'البلد', value: selectedOrder.shippingData?.country },
                          { label: 'المدينة', value: selectedOrder.shippingData?.city },
                          { label: 'الحي', value: selectedOrder.shippingData?.area },
                          { label: 'العنوان', value: selectedOrder.shippingData?.street },
                          { label: 'ملاحظات', value: selectedOrder.shippingData?.note || 'لا يوجد' },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-medium text-gray-600">{item.label}:</span>
                            <span className="text-gray-800">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        معلومات الطلب
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="font-medium text-gray-600">حالة الدفع:</span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${selectedOrder.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedOrder.isPaid ? 'تم الدفع' : 'لم يتم الدفع'}
                          </span>
                        </div>
                        {selectedOrder.isPaid && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-medium text-gray-600">تاريخ الدفع:</span>
                            <span className="text-gray-800">{formatDate(selectedOrder.paidAt)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="font-medium text-gray-600">حالة التوصيل:</span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${selectedOrder.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {selectedOrder.isDelivered ? 'تم التوصيل' : 'قيد التوصيل'}
                          </span>
                        </div>
                        {selectedOrder.isDelivered && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-medium text-gray-600">تاريخ التوصيل:</span>
                            <span className="text-gray-800">{formatDate(selectedOrder.deliveredAt)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="font-medium text-gray-600">طريقة الدفع:</span>
                          <span className="text-gray-800">
                            {selectedOrder.paymentMethod === 'card' ? 'بطاقة ائتمان' : selectedOrder.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      المنتجات
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {['المنتج', 'السعر', 'الكمية', 'المجموع'].map((header, index) => (
                              <th 
                                key={index}
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedOrder.cartItems.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                    {item.product?.image ? (
                                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                                    ) : (
                                      <span className="text-gray-400">📦</span>
                                    )}
                                  </div>
                                  <div className="mr-3">
                                    <div className="font-medium">
                                      {item.product?.name || 'تم حذف المنتج'}
                                    </div>
                                    {item.product?.sku && (
                                      <div className="text-gray-500 text-xs">SKU: {item.product.sku}</div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {convertCurrency(item.price, "KWD", "KWD")} KWD
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {convertCurrency(item.price * item.quantity, "KWD", "KWD")} KWD
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="flex justify-end">
                    <div className="w-full md:w-1/2 space-y-4 bg-gray-50 p-5 rounded-lg">
                      <h3 className="text-lg font-semibold border-b pb-2">ملخص الطلب</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">المجموع:</span>
                          <span>{convertCurrency(selectedOrder.totalOrderPrice, "KWD", "KWD")} KWD</span>
                        </div>
                        {selectedOrder.totalOrderPriceAfterDiscount && (
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">الخصم:</span>
                            <span className="text-red-500">
                              -{convertCurrency(selectedOrder.totalOrderPrice - selectedOrder.totalOrderPriceAfterDiscount, "KWD", "KWD")} KWD
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">تكلفة الشحن:</span>
                          <span>{convertCurrency(selectedOrder.shippingPrice, "KWD", "KWD")} KWD</span>
                        </div>
                        <div className="flex justify-between border-t pt-3 font-bold text-lg">
                          <span>المبلغ الإجمالي:</span>
                          <span className="text-primary">
                            {convertCurrency(
                              selectedOrder.totalOrderPriceAfterDiscount 
                                ? selectedOrder.totalOrderPriceAfterDiscount + selectedOrder.shippingPrice
                                : selectedOrder.totalOrderPrice + selectedOrder.shippingPrice, 
                              "KWD", 
                              "KWD"
                            )} KWD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-4 mt-8">
                    <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                      <FiPrinter className="ml-2" /> طباعة الفاتورة
                    </button>
                    <button className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center">
                      <FiDownload className="ml-2" /> تحميل الفاتورة
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Orders;