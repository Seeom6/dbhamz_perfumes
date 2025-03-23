import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import ApiError from "./../lib/ApiError.js";
import generateToken from "./../middleware/generateToken.middleware.js";
import User from "../models/user.model.js";

// # Signup User
// # POST   /app/register
// # public
export const signup = asyncHandler(async (req, res, next) => {
  const phoneNumber = req.body.phone
  
  const getPhone = await User.findOne({phone : phoneNumber})

  if(getPhone) return next(new ApiError("هذا الرقم مسجل من قبل"))

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    password: req.body.password,
    slug: req.body.slug,
  });
  delete user.password
  generateToken(res, user._id);

  res.status(200).json({ data: {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    _id: user._id
  } });
});

// # Login User
// # POST   /app/login
// # public
export const login = asyncHandler(async (req, res, next) => {
  let findUserBy = {};
  if (req.body.phone) findUserBy.phone = req.body.phone;

  const user = await User.findOne(findUserBy);
  if (!user) {
    return next(new ApiError("Invalid credentials", 401));
  }

  const decryptionPass = await bcrypt.compare(req.body.password, user.password);
  if (!decryptionPass) {
    return next(new ApiError("Invalid credentials", 401));
  }

  generateToken(res, user._id);

  res.status(200).json({ data: {
      "id": user._id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "slug": user.slug,
      "email": user.email,
      "phone": user.phone,
      "roles": user.roles,
    } });
});

// @ implement authentication
export const protect = asyncHandler(async (req, res, next) => {
  // @ check if token exist
  const { token } = req.cookies;
  console.log(token)
  if (!token)
    return next(
      new ApiError(
        "Unauthorized - no token provided... please try to login in your account"
      )
    );

  // @ verify token to check if something had changed
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded)
    return next(new ApiError("Unauthorized - please try to login again", 401));

  // @ check if user still in data base
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) return next(new ApiError("user Not found", 401));

  // @ check if user change his password

  if (currentUser.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );

    if (passChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently change his password , please login again",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});

export const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(new ApiError("You are not allowed to access this page", 403));
    }

    next();
  });

  export const getMe = asyncHandler(async ( req, res , next)=>{
    const user = req.user

    if(!user) next(new ApiError("Unauthorized - please try to login again"))
  
    res.status(200).json({data: {...user._doc , password : undefined }})
  })