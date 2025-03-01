import  asyncHandler  from 'express-async-handler';
import { v4 as uuidv4 } from "uuid";
import sharp from 'sharp';
import  bcrypt  from 'bcryptjs';

import User from "../models/user.model.js";
import { uploadSingleImage } from './../middleware/uploadImages.middleware.js';
import {
  createItem,
  deleteItem,
  getAllItems,
  getOneItem,
  updateItem,
} from "./general.controller.js";

export const uploadUserImage = uploadSingleImage("profileImage");

// # Resize Images
export const resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(500, 400)
      .toFormat("jpeg")
      .toFile(`src/uploads/users/${fileName}`);

    req.body.profileImage = fileName;
  }

  next();
});

// # Create User
// # POST   /app/register
// # Private
export const createUser = createItem(User);

// # Get User
// # GET   /app/register
// # Private
export const getUsers = getAllItems(User);

// # Get User
// # GET   /app/register
// # Private
export const getOneUser = getOneItem(User);

// # Update User
// # PATCH   /app/users/:id
// # Private
export const updateUser =asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImage: req.body.profileImage,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!user) {
    return next(new ApiError(`No user for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: user });
});;


export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!user) {
    return next(new ApiError(`Not Found User`, 404));
  }
  res.status(200).json({ data: user });
});

// # Delete User
// # DELETE    /app/users/:id
// # Private
export const deleteUser = deleteItem(User);

