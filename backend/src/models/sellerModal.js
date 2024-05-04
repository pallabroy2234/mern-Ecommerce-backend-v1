const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name'],
        minLength: [3, 'Name must be at least 3 characters'],
    },
    email: {
        type: String, required: [true, 'Please enter your email'], unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false,
        set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10))
    },
    role: {
        type: String,
        default: "seller"
    },
    status: {
        type: String,
        default: "pending"
    },
    payment: {
        type: String,
        default: "inactive"
    },
    method: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    shopInfo: {
        type: Object,
        default: {},
    },
}, {timestamps: true})


const Seller = model("sellers", sellerSchema)
module.exports = Seller;