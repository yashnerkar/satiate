const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Organization name is required'],
        minlength: [3, 'Name must be at least 3 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    phoneNumber: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    state: {
        type: String,
        enum: {
            values: [
                'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
                'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
                'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
                'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
                'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
                'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
                'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
                'Chandigarh', 'Puducherry',
            ],
            message: '{VALUE} is not a valid Indian state',
        },
    },
    upiID: {
        type: String,
        trim: true,
        match: [/^[\w.\-]+@[\w]+$/, 'UPI ID must be in format username@bankhandle (e.g. ngo@paytm)'],
    },
    description: {
        type: String,
        default: '',
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
        type: String,
        enum: {
            values: ['education', 'healthcare', 'hunger', 'environment', 'animals', 'disaster', 'other'],
            message: '{VALUE} is not a valid category',
        },
        default: 'other',
    },
    aadhaarNumber: {
        type: String,
        match: [/^\d{12}$/, 'Aadhaar number must be exactly 12 digits'],
    },
    aadhaarVerified: {
        type: Boolean,
        default: false,
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    logo: {
        type: String,
        default: '',
    },
    targetAmount: {
        type: Number,
        default: 0,
        min: [0, 'Target amount cannot be negative'],
    },
    raisedAmount: {
        type: Number,
        default: 0,
        min: [0, 'Raised amount cannot be negative'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;