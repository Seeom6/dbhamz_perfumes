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
  shippingData: {
    fullName :{
      type  : String,
      required: true
    },
    phoneNumber: {
      type : String,
      required : true,
    },
    country: {
      type : String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    neighborhood:{
      type: String,
      required : true
    },
    street:{
      type: String,
      required: true,
    },
    reviews : String,
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