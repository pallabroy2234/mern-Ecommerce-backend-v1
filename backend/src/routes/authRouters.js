const express = require('express');

const authRouter = express.Router();
const authControllers = require("../controllers/authControllers")
const {validAdmin} = require("../validator/adminValidator");
const {runValidation} = require("../validator");
const {authMiddleware} = require("../middleware/authMiddleware");
const {sellerValidRegister, sellerValidLogin, sellerProfileAddValidator} = require("../validator/sellerValidator");
const {upload} = require("../utiles/upload");


// ! admin login -> POST
authRouter.post("/admin-login", validAdmin, runValidation, authControllers.admin_login)

// ! get user info -> GET
authRouter.get("/get-user",authMiddleware, authControllers.getUser)


// ! seller register -> POST
authRouter.post("/seller-register", sellerValidRegister,runValidation ,authControllers.seller_register)


// ! seller login -> POST
authRouter.post("/seller-login", sellerValidLogin,runValidation, authControllers.seller_login)

// ! Seller Profile Image Upload -> POST
authRouter.post("/profile-image-upload", upload.single("image"), authMiddleware, authControllers.profile_image_upload)

//  ! Seller Profile Info add - > POST
authRouter.post("/profile-info-add", authMiddleware, sellerProfileAddValidator,runValidation, authControllers.profile_info_add)


module.exports = authRouter;

