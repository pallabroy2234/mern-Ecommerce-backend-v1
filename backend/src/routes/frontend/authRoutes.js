const express = require('express');
const {handleUserRegister, handleUserLogin} = require("../../controllers/frontend/authControllers");
const {userRegisterValidator} = require("../../validator/frontend/authValidator");
const {runValidation} = require("../../validator");
const {authMiddleware, isLoggedOut, isUser} = require("../../middleware/frontend/authMiddleware");

const authRouter = express.Router();


// ! USER REGISTER
authRouter.post("/user-register", userRegisterValidator, runValidation, handleUserRegister)

// ! USER LOGIN

authRouter.post("/user-login", isLoggedOut, isUser, handleUserLogin)


module.exports = authRouter;