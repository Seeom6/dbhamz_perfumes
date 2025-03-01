import express from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  uploadUserImage,
  resizeImage,
  updateUser,
  changeUserPassword,
} from "../controllers/user.controller.js";
import { protect, allowedTo } from "./../controllers/auth.controller.js";
import {
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getOneUserValidator,
  updateUserValidator,
} from "../lib/validation/user.validator.js";

const Router = express.Router();

Router.route("/")
  .post(
    protect,
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  )
  .get(protect, allowedTo("admin"), getUsers);
Router.route("/:id")
  .get(protect, allowedTo("admin"), getOneUserValidator, getOneUser)
  .patch(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(protect, allowedTo("admin"), deleteUserValidator, deleteUser);

Router.patch(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);


export default Router;
