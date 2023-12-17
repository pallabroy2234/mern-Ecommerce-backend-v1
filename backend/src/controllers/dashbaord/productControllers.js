const {successResponse, errorResponse} = require("../../helper/responseHelper");
const slugify = require("slugify")
const Products = require("../../models/productModal");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Category = require("../../models/categoryModal");


// !  ADD PRODUCT -> POST  MULTIPLE IMAGE HANDLE WITH CLOUDINARY
const add_product = async (req, res, next) => {
    try {
        const {id} = req;
        if(!id){
            return errorResponse(res, {statusCode: 400, message: "Login first"});
        }
        const {name, brand, category, stock, price, discount, description, shopName} = req.body;
       
        
        
        const images = req.files;
        if (!images || images.length === 0) {
            return errorResponse(res, {statusCode: 400, message: "Images are required"});
        }
        const slug = slugify(name, {lower: true})
        
        const slugExists = await Products.exists({slug})
        
        if (slugExists) {
            return errorResponse(res, {statusCode: 400, message: "Product already exists"})
        }
        
        const uploadedImages = [];
        
        for (const image of images) {
            try {
                const result = await cloudinary.uploader.upload(image.path, {folder: "products"});
                if (!result) {
                    return errorResponse(res, {statusCode: 400, message: "Image upload failed"});
                }
                uploadedImages.push({url: result.url, imageId: result.public_id});
            } catch (e) {
                return errorResponse(res, {statusCode: 400, message: "Image upload failed"});
            } finally {
                try {
                    const filepath = image.path;
                    fs.unlinkSync(filepath);
                    console.log("Image deleted successfully");
                } catch (unlinkError) {
                    console.error("Error unlinking image:", unlinkError);
                }
            }
        }
        const product = await Products.create({
            sellerId: id,
            name,
            slug,
            brand: brand.trim(),
            category,
            stock:parseInt(stock),
            price:parseInt(price),
            discount:parseInt(discount),
            description: description.trim(),
            shopName,
            images: uploadedImages,
        })
        
        if(!product){
            return errorResponse(res, {statusCode: 400, message: "Product create failed"});
        }
        
        
        return successResponse(res, {statusCode: 201, message: "Product create successfully",payload:product });
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};



const get_products =async (req,res)=>{
    try {
        const {id}= req
        if(!id){
            return errorResponse(res, {statusCode: 400, message: "Login first"});
        }
        const {page, parPage, searchValue} = req.query;
        let skipPage = "";
        if(parPage && page){
            skipPage = (parseInt(page) - 1) * parseInt(parPage)
        }
        if (searchValue) {
            const products = await Products.find({name: {$regex: searchValue, $options: "i"},sellerId:id})
                .skip(skipPage).limit(parseInt(parPage)).sort({createdAt: -1})
            
            const totalProducts = await Products.find({
                name: {$regex: searchValue, $options: "i"},
                sellerId:id
            }).countDocuments()
            
            return successResponse(res, {statusCode: 200, payload: {products, totalProducts}})
        }else{
            const products = await Products.find({sellerId:id}).skip(skipPage).limit(parseInt(parPage)).sort({createdAt: -1})
            const totalProducts = await Products.find({sellerId:id}).countDocuments()
            return successResponse(res, {statusCode: 200, payload: {products, totalProducts}})
        }
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong"
        })
    }
    
}




module.exports = {
    add_product,
    get_products
}