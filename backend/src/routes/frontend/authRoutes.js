const express = require('express');
const {handleUserRegister} = require("../../controllers/frontend/authControllers");
const {userRegisterValidator} = require("../../validator/frontend/authValidator");
const {runValidation} = require("../../validator");

const authRouter = express.Router();


authRouter.post("/user-register", userRegisterValidator, runValidation, handleUserRegister)


module.exports = authRouter;