import { Router } from "express";
import {
  addProductToCart,
  getProductInCart,
  removeItemFromTheCart,
  clearCart,
  updateItemQuantity,
  applyCouponToCart,
  getOneCart
} from "../controllers/cart.controller.js";
import { allowedTo, protect } from "../controllers/auth.controller.js";
import {
  addProductToCartValidator,
  removeItemFromCartValidator,
  updateCartQuantityValidator
} from "../lib/validation/cart.validation.js";
const router = Router();

router.use(protect, allowedTo('user'));


router.route('/')
  .post(addProductToCartValidator, addProductToCart)
  .get(getProductInCart)
  .delete(clearCart)

router.patch("/applyCoupon" , applyCouponToCart)

router.route('/:id')
  .delete(removeItemFromCartValidator, removeItemFromTheCart)
  .patch(updateCartQuantityValidator, updateItemQuantity)
  .get(getOneCart)

export default router