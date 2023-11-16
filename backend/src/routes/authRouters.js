const express = require('express');

const authRouter = express.Router();
const authControllers = require("../controllers/authControllers")
const {validAdmin} = require("../validator/adminValidator");
const {runValidation} = require("../validator");

authRouter.post("/admin-login", validAdmin, runValidation, authControllers.admin_login)


module.exports = authRouter;

