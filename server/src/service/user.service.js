

import User from "./../models/user.model.js";
import ApiError from "../lib/ApiError.js";


const getUserByEmail = async (email, throwError = true) => {
    const user = await User.findOne({
        email: email
    })
    if (!user && throwError){
        throw new ApiError("user by this email not found", 404)
    }
    return user;
}

export const UserService = {
    getUserByEmail
}