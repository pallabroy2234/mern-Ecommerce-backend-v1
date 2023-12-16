const {Schema, model} = require('mongoose');


const categorySchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
        required: [true, "provide your image"]
    },
    imageId:{
        type:String,
        required:true,
    },
    slug: {
        type: String,
        required:true,
        unique:true,
    }
},{timestamps:true})

categorySchema.index({
    name:"text",
})


const Category = model("categories", categorySchema)
module.exports = Category;