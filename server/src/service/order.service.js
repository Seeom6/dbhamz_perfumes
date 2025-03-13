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


export const OrderService = {
    getMyOrders,
    getOrderById
}