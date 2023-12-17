const {Schema, model} = require('mongoose');


const productSchema = new Schema({
    
    sellerId:{
       type:Schema.ObjectId,
       required:[true,"Seller id is required"]
    },
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    slug:{
      type:String,
        required:[true,"Slug is required"],
        unique:true,
    },
    brand:{
        type:String,
        required:[true,"Brand is required"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    stock:{
        type:Number,
        required:[true,"Stock is required"]
    },
    discount:{
        type:Number,
        default:0,
        require:true
    },
    images: {
        type: Array,
        required: [true, "provide your image"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    shopName:{
        type:String,
        required:[true,"Shop name is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    }
},{timestamps:true})


productSchema.index({
    name:"text",
    description:"text",
    brand:"text",
    category:"text",
},{
    weights:{
        name:5,
        category:4,
        brand:3,
        description:2,
    }
})


const Products = model("products", productSchema)
module.exports = Products;