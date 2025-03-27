// models/offer.model.js
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Offer title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"]
  },
  image: {
    type: String,
    required: [true, "Image is required"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});



const setImageUrl = (doc) => {
    if (doc.image) {
      const imageUrl = `${process.env.BASE_URL}/offers/${doc.image}`;
      doc.image = imageUrl;
    }
  };
  
  offerSchema.post("init", (doc) => {
    setImageUrl(doc);
  });
  offerSchema.post("save", (doc) => {
    setImageUrl(doc);
  });

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;