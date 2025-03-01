import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      price: Number,
      quantity: {
        type: Number,
      },
    }
  ],
  taxPrice : {
    type: Number,
    default: 0
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
  totalOrderPrice:{
    type: Number
  },
  paymentMethod : {
    type: String,
    enum: ["card" , "cash"],
    default: "card"
  },
  isPaid : {
    type: Boolean,
    default: false
  },
  paidAt : Date,
  isDelivered:{
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
}, {timestamps : true});


const Order = mongoose.model("Order" , orderSchema)

export default Order