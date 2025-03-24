import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values but enforces uniqueness for non-null values
  },
  slug: {
    type: String,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  roles: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  passwordChangedAt: Date,
  profileImage: String,
  address: {
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
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const setImageUrl = (doc) => {
  if (doc.profileImage) {
    const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImage}`;
    doc.profileImage = imageUrl;
  }
};

userSchema.post("init", (doc) => {
  setImageUrl(doc);
});
userSchema.post("save", (doc) => {
  setImageUrl(doc);
});


const User = mongoose.model("User", userSchema);

export default User;
