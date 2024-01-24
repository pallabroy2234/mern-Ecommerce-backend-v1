const Seller = require("../../models/sellerModal")
const {successResponse, errorResponse} = require("../../helper/responseHelper");
const mongoose = require("mongoose");



// ! GET REQUEST SELLERS ONLY PENDING SELLERS ARE RETURNED -> GET
const getRequestSellers = async (req, res) => {
    try {
        const {id} = req;
        if (!id) {
            return errorResponse(res, {statusCode: 400, message: "Login first"});
        }
        const {currentPage, searchValue, parPage} = req.query;
        const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);
        const searchRegExp = new RegExp(".*" + searchValue + ".*", "i");
        if (searchValue) {
            const sellers = await Seller.find({
                $and: [
                    {status: "pending"},
                    {
                        $or: [
                            {name: {$regex: searchRegExp}},
                            {email: {$regex: searchRegExp}},
                            {payment: {$regex: searchRegExp}},
                        ],
                    }
                ],
            })
                .skip(skipPage)
                .limit(parseInt(parPage))
                .sort({createdAt: -1});
            
            const totalSellers = await Seller.find({
                $and: [
                    {status: "pending"},
                    {
                        $or: [
                            {name: {$regex: searchRegExp}},
                            {email: {$regex: searchRegExp}},
                            {payment: {$regex: searchRegExp}},
                            
                        ],
                    },
                ],
            }).countDocuments();
            
            return successResponse(res, {statusCode: 200, payload: {sellers, totalSellers}});
        } else {
            const sellers = await Seller.find({status: "pending"})
                .skip(skipPage)
                .limit(parseInt(parPage))
                .sort({createdAt: -1});
            
            const totalSellers = await Seller.find({status: "pending"}).countDocuments();
            
            return successResponse(res, {statusCode: 200, payload: {sellers, totalSellers}});
        }
    } catch (e) {
        return errorResponse(res, {statusCode: 500, message: "Something went wrong"});
    }
};

// ! GET SELLER BY ID -> GET

const getSellerById = async (req,res)=> {
    try{
        const {id}=req;
        if(!id){
            return errorResponse(res,{statusCode:404,message:"Login first"})
        }
        const {sellerId} = req.params;
       if(!sellerId){
           return errorResponse(res,{statusCode:404, message:"Seller id not found"})
       }
       
       const seller = await Seller.findById(sellerId);
         if(!seller){
              return errorResponse(res,{statusCode:404,message:"Seller not found"})
         }
         return successResponse(res,{statusCode:200,payload:seller})
    }catch (error) {
        if (error instanceof mongoose.Error) {
            return errorResponse(res,{
                statusCode:500,
                message:"Invalid seller id"
            })
        }
        return errorResponse(res, {
            statusCode: 500,
            message: "Internal Server Error",
        })
    }
}


// ! UPDATE SELLER STATUS -> POST

const updateSellerStatus = async(req,res)=> {
    try{
        console.log("Pallab")
    }catch (e) {
        return errorResponse(res, {
            statusCode:500,
            message:"Internal Server Error"
        })
    }
}

module.exports = {
    getRequestSellers,
    getSellerById,
    updateSellerStatus
}