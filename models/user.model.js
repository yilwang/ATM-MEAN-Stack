const mongoose = require('mongoose');
const user_schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    pin: Number,
    account: {
        account_num: String,
        amount: Number
    }
});

const Customer = mongoose.model("customer",user_schema);
module.exports = Customer;

