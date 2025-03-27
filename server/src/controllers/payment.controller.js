import asyncHandler from 'express-async-handler';
import { MyFatooraService } from '../service/payments/myFatura/myFatura.service.js';
import Order from '../models/order.model.js';

export const directVerifyPayment = asyncHandler(async (req, res) => {
  try {
    const payment = await MyFatooraService.getPaymetStatus(
      req.params.paymentId,
      "InvoiceId"
    );

    const isSuccess = ["Paid", "SUCCESS", "Succeeded", "Y", "2"]
      .some(status => payment.Data.TransactionStatus?.includes(status));

    if (isSuccess) {
      await Order.updateOne(
        { paymentId: req.params.paymentId },
        { 
          isPaid: true,
          paidAt: new Date(),
          paymentStatus: 'Paid'
        }
      );
    }

    res.json({ 
      isSuccess,
      status: payment.Data.TransactionStatus 
    });
  } catch (error) {
    res.status(500).json({ error: "Payment verification failed" });
  }
});