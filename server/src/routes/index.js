
import BrandRouter from "./brand.route.js";
import ProductRouter from "./product.route.js";
import UserRoute from "./user.route.js"
import authRouter from "./auth.route.js"
import reviewRouter from "./review.route.js"
import wishListRouter from "./wishList.route.js"
import CartRouter from "./cart.router.js";
import CouponRouter from "./coupon.router.js";
import OrderRouter from "./order.route.js";
import OfferRoute from "./offer.route.js";

export const appRouter = (app)=>{
    app.use("/app/v1/brands", BrandRouter);
    app.use("/app/v1/products", ProductRouter);
    app.use("/app/v1/users" , UserRoute)
    app.use("/app/v1/auth" , authRouter)
    app.use("/app/v1/reviews" , reviewRouter)
    app.use("/app/v1/wish-list", wishListRouter)
    app.use("/app/v1/cart", CartRouter)
    app.use("/app/v1/coupon", CouponRouter);
    app.use("/app/v1/order" , OrderRouter)
    app.use("/app/v1/offers" , OfferRoute)

}