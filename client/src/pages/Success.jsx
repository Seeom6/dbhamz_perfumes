import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBagCheckFill } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { Context } from '../context/StatContext';
import { runFireworks } from '../utils/confetti'; // Optional: For confetti animation

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useContext(Context);
  const [order, setOrder] = useState(null);
  const whatsappUrl = `https://wa.me/${+96566621132}?`;

  useEffect(() => {
    // Clear cart and local storage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalQuantities');
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);

    // Optional: Run confetti animation
    runFireworks();

    // Fetch order details (if needed)
    const fetchOrder = async () => {
      try {
        const orderId = new URLSearchParams(window.location.search).get('orderId');
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
      <div className="success bg-white p-8 rounded-lg shadow-2xl text-center max-w-md w-full transform transition-all duration-500 hover:scale-105">
        <div className="icon-container mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <BsBagCheckFill size={40} color="green" className="animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">شكراً لطلبك من موقعنا!</h2>
        <p className="text-gray-600 mb-4">
          تحقق من صندوق بريدك الإلكتروني للحصول على الإيصال.
        </p>
        <p className="text-gray-600 mb-6">
          إذا كان لديك أي أسئلة، يرجى مراسلتنا عبر الرقم التالي:
        </p>
        <Link
          to={whatsappUrl}
          className="whatsapp-link flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <FaWhatsapp size={20} />
          <span>965-66621132+</span>
        </Link>
        {order && (
          <div className="order-details mt-6 p-4 bg-gray-50 rounded-lg text-left">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">تفاصيل الطلب</h3>
            <p className="text-sm text-gray-600">رقم الطلب: {order._id}</p>
            <p className="text-sm text-gray-600">المبلغ الإجمالي: ${order.totalAmount.toFixed(2)}</p>
            <p className="text-sm text-gray-600">عنوان الشحن: {order.shippingAddress}</p>
          </div>
        )}
        <Link to="/" className="block mt-6">
          <button className="btn bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            مواصلة التسوق
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;