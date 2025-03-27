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
      quantity: Number,
      productImage: String, // Add this field
      productName: String, // Optional: for easier reference
    }
  ],
  paymentId: {
    type: String,
    required: true // Make it required if using MyFatoorah
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'expired'],
    default: 'pending'
  },
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
  totalOrderPriceAfterDiscount: {
    type: Number,
    default: null
  },
  paymentMethod : {
    type: String,
    default: "card"
  },
  isPaid : {
    type: Boolean,
    default: false
  },
  paidAt : Date,
  paymentStatus: {
    type: String,
  },
  isDelivered:{
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  shippingData: {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    street:  {
      type: String,
      default: null,
    },
    area: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
    paymentGateway: {
      type: String,
      default: 'myfatoorah'
    },
  }
}, {timestamps : true});


const Order = mongoose.model("Order" , orderSchema)

export default Order