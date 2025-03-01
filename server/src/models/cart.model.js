import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  cartItems: [
    {
      product:  {
        type: Schema.ObjectId,
        ref: 'Product'
      },
      price: Number,
      quantity: {
        type: Number,
        default: 1
      },
    }
  ],
  totalPrice: Number,
  totalPriceAfterDiscount: Number,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},{timestamps: true})

export const CartModel = model('Cart',cartSchema)