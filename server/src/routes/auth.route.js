import express from "express";
import { getMe, login, protect, signup } from "../controllers/auth.controller.js";
import {
  loginValidator,
  signupValidator,
} from "./../lib/validation/auth.validator.js";

const Router = express.Router();

Router.route("/signup").post(signupValidator, signup);
Router.route("/login").post(loginValidator, login);
Router.get("/getme" ,protect, getMe)

export default Router;
