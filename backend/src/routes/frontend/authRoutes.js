const express = require("express");
const {handleUserRegister, handleUserLogin, handleUserLogout, handleChangePassword} = require("../../controllers/frontend/authControllers");
const {userRegisterValidator, userLoginValidator, userChangePasswordValidator} = require("../../validator/frontend/authValidator");
const {runValidation} = require("../../validator");
const {authMiddleware, isLoggedOut, isUser} = require("../../middleware/frontend/authMiddleware");

const authRouter = express.Router();

// ! USER REGISTER
authRouter.post("/user-register", userRegisterValidator, runValidation, handleUserRegister);

// ! USER LOGIN

authRouter.post("/user-login", isLoggedOut, userLoginValidator, runValidation, handleUserLogin);

// *  USER LOGOUT
authRouter.get("/user-logout", authMiddleware, handleUserLogout);

// * CHANGE PASSWORD
authRouter.post("/change-password", authMiddleware, isUser, userChangePasswordValidator, runValidation, handleChangePassword);
module.exports = authRouter;
