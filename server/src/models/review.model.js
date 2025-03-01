import mongoose from "mongoose"


const reviewSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    ratings:{
        type: Number,
        min : 1,
        max: 5,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required : true,
    }
},{timestamps: true})


const Review = mongoose.model("review" , reviewSchema)

export default Review