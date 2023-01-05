const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    amountDonated: {
        type: Number,
    },
    paymentDetails: {
        type: Object,
    },
    organization: {
        type: String,
    },


});

const User = mongoose.model('User', userSchema);
module.exports = User;