const mongoose = require('mongoose');


const organizeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    password: {
        type: String,
    },
    location: {
        type: String,
    },
    upiID: {
        type: String,
    }
});

const Organization = mongoose.model('Organization', organizeSchema);
module.exports = Organization;