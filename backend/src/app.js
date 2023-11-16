const express = require('express');
const {errorResponse} = require("./helper/responseHelper");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const authRouter = require("./routes/authRouters")


// !  all server middleware
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())


// ! routers
app.use("/api", authRouter)


// ! client side error handler
// client error handle
app.use((req, res, next) => {
    next(createError(404, "Route not found"));
});


// !  all server error handler
app.use((err, req, res, next) => {
    console.log(err)
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message,
    })
})


module.exports = app;