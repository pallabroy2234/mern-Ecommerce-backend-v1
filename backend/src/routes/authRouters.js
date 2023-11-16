const express = require('express');

const authRouter = express.Router();
const authControllers = require("../controllers/authControllers")
const {validAdmin} = require("../validator/adminValidator");
const {runValidation} = require("../validator");
const {authMiddleware} = require("../middleware/authMiddleware");


// ! admin login -> POST
authRouter.post("/admin-login", validAdmin, runValidation, authControllers.admin_login)

authRouter.get("/get-user", authMiddleware, authControllers.getUser)


module.exports = authRouter;

