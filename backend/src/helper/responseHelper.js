const errorResponse = (res, {statusCode = 500, message = "Internal Server Error"}) => {
    return res.status(statusCode).json({
        success: false,
        message: message
    })
}

const successResponse = (res, {statusCode = 200, message = "Success", payload = {}}) => {
        return  res.status(statusCode).json({
        success: true,
        message: message,
        payload: payload,
      
    })
}

module.exports = {
    errorResponse,
    successResponse
}