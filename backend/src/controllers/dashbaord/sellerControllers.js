const Seller = require("../../models/sellerModal")
const {successResponse, errorResponse} = require("../../helper/responseHelper");


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


module.exports = {
    getRequestSellers,
}