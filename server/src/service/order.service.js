import OrderModel from "../models/order.model.js";
import ApiError from "../lib/ApiError.js";


async function getMyOrders(id){
    const orders = await OrderModel.find({
        user: id
    })
    return orders;
}

async function getOrderById(id){
    const order = await OrderModel.findById({
        _id: id
    })
    if (!order) {
        throw new ApiError("order not found", 404);
    }
    return order
}

async function getOrderByPaymentId(paymentId){
    const order = await OrderModel.findOne({
        paymentId: paymentId
    })
    if (!order) {
        console.log("Order not found", 404);
        throw new ApiError("order not found", 404);
    }
    return order
}

async function updateOrder(id, updateData) {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      throw new ApiError("Order not found", 404);
    }
    return updatedOrder;
  }
export const OrderService = {
    getMyOrders,
    getOrderById,
    getOrderByPaymentId,
    updateOrder
}