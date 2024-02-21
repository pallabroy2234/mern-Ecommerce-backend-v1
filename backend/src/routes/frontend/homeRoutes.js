
const express = require('express');
const {getCategories} = require("../../controllers/frontend/homeControllers");
const homeRouter = express.Router();



homeRouter.get("/get-categories" , getCategories)



module.exports = homeRouter;