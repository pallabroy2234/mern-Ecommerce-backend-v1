const express = require('express');

const authRouter = express.Router();
const authControllers = require("../controllers/authControllers")

authRouter.post("/admin-login", authControllers.admin_login)


module.exports = authRouter;

