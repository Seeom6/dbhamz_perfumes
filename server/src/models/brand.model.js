import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post("init", (doc) => {
  setImageUrl(doc);
});
brandSchema.post("save", (doc) => {
  setImageUrl(doc);
});

const Brand = mongoose.model("Brands", brandSchema);

export default Brand;
