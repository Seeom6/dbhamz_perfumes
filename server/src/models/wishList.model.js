import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
    {
        userId: {
            type : mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "product",
            required : true,
        },
    },
    { timestamps: true }
);


const WishListModel = mongoose.model("wishList", brandSchema);

export default WishListModel;
