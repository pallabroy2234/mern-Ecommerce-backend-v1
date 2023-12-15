const express = require('express');

const authRouter = express.Router();
const authControllers = require("../controllers/authControllers")
const {validAdmin} = require("../validator/adminValidator");
const {runValidation} = require("../validator");
const {authMiddleware} = require("../middleware/authMiddleware");
const {sellerValidRegister, sellerValidLogin} = require("../validator/sellerValidator");


// ! admin login -> POST
authRouter.post("/admin-login", validAdmin, runValidation, authControllers.admin_login)

// ! get user info -> GET
authRouter.get("/get-user",authMiddleware, authControllers.getUser)


// ! seller register -> POST
authRouter.post("/seller-register", sellerValidRegister,runValidation ,authControllers.seller_register)


// ! seller login -> POST
authRouter.post("/seller-login", sellerValidLogin,runValidation, authControllers.seller_login)

module.exports = authRouter;

