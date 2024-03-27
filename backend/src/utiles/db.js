require("dotenv").config();
const mongoose = require("mongoose");
const {errors} = require("formidable");


const connectDatabase = async (options = {}) => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            ...options,
        });
        console.log("Mongodb connection established");
        mongoose.connection.on("error", (error) => {
            console.error("Mongodb connection error", error);
        });
    } catch (e) {
        console.error("Could not connect to DB", e);
    }
};

module.exports = connectDatabase;