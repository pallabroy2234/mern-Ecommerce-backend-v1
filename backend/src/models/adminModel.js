const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    name: {
        type: String,
    }, email: {
        type: String, required: [true, 'Please enter your email'], unique: true,
        
    }, password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false,
        set: (val) => bcrypt.hashSync(val, bcrypt.genSalt(10))
    }, image: {
        type: String, required: [true, "provide your image"]
    }, role: {
        type: String, default: "admin"
    }
})


const Admin = model("admins", adminSchema)
module.exports = Admin;