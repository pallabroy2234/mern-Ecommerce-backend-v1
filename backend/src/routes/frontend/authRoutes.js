const express = require("express");
const {handleUserRegister, handleUserLogin, handleUserLogout} = require("../../controllers/frontend/authControllers");
const {userRegisterValidator, userLoginValidator} = require("../../validator/frontend/authValidator");
const {runValidation} = require("../../validator");
const {authMiddleware, isLoggedOut, isUser} = require("../../middleware/frontend/authMiddleware");

const authRouter = express.Router();

// ! USER REGISTER
authRouter.post("/user-register", userRegisterValidator, runValidation, handleUserRegister);

// ! USER LOGIN

authRouter.post("/user-login", isLoggedOut, userLoginValidator, runValidation, handleUserLogin);

// *  USER LOGOUT
authRouter.get("/user-logout", authMiddleware, handleUserLogout);

module.exports = authRouter;
