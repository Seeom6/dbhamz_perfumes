import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useGetOrder } from '../utils/Api/OrderEndPoint';
import globalAxios from './../utils/Axios';

const PaymentStatus = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [localOrder, setLocalOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const { data: order, isLoading, error, refetch } = useGetOrder(id);

  // Helper function to determine payment status from MyFatoorah response
  const getStatusFromResponse = (paymentData) => {
    if (!paymentData?.Data) return 'error';
    
    const status = paymentData.Data.InvoiceStatus?.toLowerCase();
    const transactionStatus = paymentData.Data.InvoiceTransactions?.[0]?.TransactionStatus?.toLowerCase();
    
    if (status === 'paid' || transactionStatus === 'succeeded') return 'success';
    if (status === 'failed' || transactionStatus === 'failed') return 'failed';
    if (status === 'pending') return 'pending';
    return 'error';
  };

  // Sync local state with query data
  useEffect(() => {
    if (order) {
      setLocalOrder(order);
      if (order.isPaid) {
        setPaymentStatus('success');
      } else if (order.paymentStatus?.toLowerCase() === 'failed') {
        setPaymentStatus('failed');
      }
    }
  }, [order]);

  // Countdown effect for pending status
  useEffect(() => {
    let interval;
    if (paymentStatus === 'pending' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, countdown]);

  // Payment verification effect
  useEffect(() => {
    const verifyPaymentStatus = async () => {
      if (!id || isLoading) return;
      
      setIsVerifying(true);
      try {
        const statusParam = searchParams.get('status');
        
        // 1. First verify with backend
        const { data: verifiedOrder } = await globalAxios.get(`/order/check-payment-status/${id}`);
        // 2. Check direct payment status if paymentId exists
        if (verifiedOrder?.paymentId) {
          const { data: paymentData } = await globalAxios.get(`/order/direct-verify/${verifiedOrder.paymentId}`);
          setPaymentDetails(paymentData.payment?.Data);
          const paymentStatusFromResponse = getStatusFromResponse(paymentData.payment);
          
          if (paymentStatusFromResponse === 'success') {
            setLocalOrder(prev => ({ 
              ...prev, 
              isPaid: true, 
              paymentStatus: 'paid',
              paidAt: paymentData.payment?.Data?.CreatedDate || new Date()
            }));
            setPaymentStatus('success');
            toast.success('تم تأكيد الدفع بنجاح!');
            return;
          }
          
          if (paymentStatusFromResponse === 'failed') {
            setPaymentStatus('failed');
            return;
          }
        }

        // 3. Update status based on order verification
        if (verifiedOrder?.isPaid) {
          setLocalOrder(verifiedOrder);
          setPaymentStatus('success');
          toast.success('تم تأكيد الدفع بنجاح!');
          return;
        }

        // 4. Handle pending status from URL or response
        if (statusParam === 'success' || 
            (paymentDetails?.InvoiceStatus?.toLowerCase() === 'pending' && 
             !verifiedOrder?.isPaid)) {
          setPaymentStatus('pending');
          setCountdown(60);
          
          // Start polling
          const interval = setInterval(async () => {
            const { data } = await refetch();
            if (data?.isPaid) {
              clearInterval(interval);
              setLocalOrder(data);
              setPaymentStatus('success');
              toast.success('تم تأكيد الدفع بنجاح!');
            }
          }, 5000);
          
          return () => clearInterval(interval);
        }

        // 5. Handle failed status
        if (statusParam === 'failed' || 
            verifiedOrder?.paymentStatus?.toLowerCase() === 'failed' ||
            paymentDetails?.InvoiceStatus?.toLowerCase() === 'failed') {
          setPaymentStatus('failed');
        }
      } catch (err) {
        setPaymentStatus('error');
        toast.error('فشل في التحقق من حالة الدفع');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPaymentStatus();
  }, [id, searchParams, refetch, isLoading]);

  const getStatusContent = () => {
    const shortOrderId = localOrder?._id ? localOrder._id.slice(-6).toUpperCase() : 'N/A';
    const formattedDate = localOrder?.paidAt ? new Date(localOrder.paidAt).toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : null;

    const invoiceValue = paymentDetails?.InvoiceDisplayValue || `${localOrder?.totalOrderPrice || 0} KWD`;
    const invoiceId = paymentDetails?.InvoiceId || localOrder?.paymentId || 'N/A';
    const invoiceStatus = paymentDetails?.InvoiceStatus || localOrder?.paymentStatus || 'غير معروف';

    switch (paymentStatus) {
      case 'success':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-green-600">تم الدفع بنجاح!</h1>
            <p className="mt-2 text-gray-600">
              شكراً لشرائك. تم تأكيد طلبك رقم #{shortOrderId}
            </p>
            
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-right">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">رقم الفاتورة:</span>
                  <span className="font-semibold">{invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">المبلغ المدفوع:</span>
                  <span className="font-semibold">{invoiceValue}</span>
                </div>
                {formattedDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">تاريخ الدفع:</span>
                    <span className="text-sm text-green-600">{formattedDate}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/profile/orders')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                عرض طلباتي
              </button>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        );

      case 'failed':
      case 'error':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-red-600">فشل عملية الدفع</h1>
            <p className="mt-2 text-gray-600">
              لم نتمكن من معالجة دفعتك للطلب رقم #{shortOrderId}
            </p>
            
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-right">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">رقم الفاتورة:</span>
                  <span className="font-semibold">{invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">المبلغ:</span>
                  <span className="font-semibold">{invoiceValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">الحالة:</span>
                  <span className="text-sm text-red-600">{invoiceStatus}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(`/checkout/${localOrder?._id}`)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                المحاولة مرة أخرى
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                الاتصال بالدعم
              </button>
            </div>
          </div>
        );

      case 'pending':
      default:
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
              <Clock className="h-10 w-10 text-yellow-600" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-yellow-600">جاري معالجة الدفع</h1>
            <p className="mt-2 text-gray-600">
              دفعتك للطلب رقم #{shortOrderId} قيد المعالجة
            </p>
            <p className="text-sm text-gray-500 mt-1">
              قد يستغرق الأمر بضع دقائق. يرجى عدم إعادة تحميل الصفحة.
            </p>
            
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-right">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">رقم الفاتورة:</span>
                  <span className="font-semibold">{invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">المبلغ:</span>
                  <span className="font-semibold">{invoiceValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">الحالة:</span>
                  <div className="flex items-center">
                    <span className="text-sm text-yellow-600 mr-2">
                      {invoiceStatus}
                    </span>
                    <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                  </div>
                </div>
                {paymentDetails?.ExpiryDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">تاريخ الانتهاء:</span>
                    <span className="text-sm text-yellow-600">
                      {new Date(paymentDetails.ExpiryDate).toLocaleString('ar-EG')}
                    </span>
                  </div>
                )}
                <div className="mt-3 text-xs text-gray-500">
                  التحديث التلقائي خلال: {countdown} ثانية
                </div>
              </div>
            </div>
            
            <button
              onClick={() => refetch()}
              className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              تحديث الحالة الآن
            </button>
          </div>
        );
    }
  };

  // Loading, error, and empty states remain the same as before
  // ...

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        {getStatusContent()}
      </div>
    </div>
  );
};

export default PaymentStatus;