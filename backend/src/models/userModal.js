const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name'],
        minLength: [3, 'Name must be at least 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false,
        set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10))
    },
    role: {
        type: String,
        default: "user"
    },
    method: {
        type: String,
        required: true,
        default: "manually"
    },
    
}, {timestamps: true})


const users = model("users", userSchema)
module.exports = users;