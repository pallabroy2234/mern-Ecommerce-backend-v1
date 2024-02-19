
const express = require('express');

const categoryRouter =express.Router();
const categoryControllers = require("../../controllers/dashbaord/categoryControllers")
const {authMiddleware, isAdmin} = require("../../middleware/authMiddleware");
const {upload} =require("../../utiles/upload")
// ! Add category -> POST

categoryRouter.post("/category-add", upload.single("image"),authMiddleware, isAdmin, categoryControllers.add_category)

// ! Get all categories -> GET
categoryRouter.get("/get-categories",authMiddleware, categoryControllers.get_category)







module.exports =categoryRouter;