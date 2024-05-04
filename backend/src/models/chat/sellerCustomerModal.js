const {Schema, model} = require('mongoose');

const sellerCustomerSchema = new Schema({
    myId: {
        type: String,
        require:true
    },
    myFriends: {
        type: Array,
        default:[],
    },
}, {timestamps: true})


const sellerCustomer = model("sellerCustomers", sellerCustomerSchema)
module.exports = sellerCustomer;