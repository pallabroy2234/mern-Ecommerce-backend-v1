require("dotenv").config();
const mongoose = require("mongoose");
const {errors} = require("formidable");


const connectDatabase = async (options = {}) => {
    try {
       
       if(process.env.MODE === "production"){
           await mongoose.connect(process.env.DB_PRODUCTION_URL, {
               ...options,
           });
           console.log("Mongodb production  connection established");
           mongoose.connection.on("error", (error) => {
               console.error("Mongodb connection error", error);
           });
       }else {
           await mongoose.connect(process.env.DB_LOCAL_URL, {
               ...options,
           });
           console.log("Mongodb local connection established");
           mongoose.connection.on("error", (error) => {
               console.error("Mongodb local connection error", error);
           });
       }
    } catch (e) {
        console.error("Could not connect to DB", e);
    }
};

module.exports = connectDatabase;