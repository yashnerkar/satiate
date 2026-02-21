const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();
const Organization = require('../models/organizations');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const saltRounds = 10;

console.log('razorpay key id', process.env.RAZORPAY_KEY_ID);
console.log('razorpay key secret', process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── Helper: Format Mongoose validation errors ──
function formatValidationError(err) {
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return messages.join('. ');
    }
    if (err.code === 11000) {
        return 'An organization with this email already exists.';
    }
    return err.message;
}

// ──────────────── Organization CRUD ────────────────

// GET all organizations (with optional state & category filters)
router.get('/organizations', async (req, res) => {
    try {
        const filter = {};
        if (req.query.state) filter.state = req.query.state;
        if (req.query.category) filter.category = req.query.category;

        const organizations = await Organization.find(filter).select('-password');
        res.json({ organizations, status: 'success' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET single organization + its donors
router.get('/organizations/:id', async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id).select('-password');
        if (!organization) {
            return res.status(404).json({ status: 'Organization not found' });
        }
        const donors = await User.find({ organization: organization.name }).sort({ donatedAt: -1 });
        res.json({ organization, donors, status: 'success' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// ──────────────── Auth ────────────────

// Register organization
router.post('/organizations/register', async (req, res) => {
    try {
        const { name, email, phoneNumber, password, state, upiID, description, category, aadhaarNumber, targetAmount } = req.body;

        // Backend validations (on top of Mongoose schema validations)
        if (!name || name.trim().length < 3) {
            return res.status(400).json({ status: 'Organization name must be at least 3 characters' });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ status: 'Please enter a valid email address' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ status: 'Password must be at least 6 characters' });
        }
        if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ status: 'Phone number must be exactly 10 digits' });
        }
        if (upiID && !/^[\w.\-]+@[\w]+$/.test(upiID)) {
            return res.status(400).json({ status: 'UPI ID must be in format username@bankhandle (e.g. ngo@paytm)' });
        }
        if (aadhaarNumber && !/^\d{12}$/.test(aadhaarNumber)) {
            return res.status(400).json({ status: 'Aadhaar number must be exactly 12 digits' });
        }
        if (targetAmount && Number(targetAmount) < 0) {
            return res.status(400).json({ status: 'Target amount cannot be negative' });
        }

        const passwordHash = bcrypt.hashSync(password, saltRounds);
        const organization = new Organization({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            state: state || '',
            phoneNumber,
            password: passwordHash,
            upiID: upiID ? upiID.trim() : '',
            description: description || '',
            category: category || 'other',
            aadhaarNumber: aadhaarNumber || '',
            targetAmount: Number(targetAmount) || 0,
        });

        await organization.save();
        const orgResponse = organization.toObject();
        delete orgResponse.password;

        res.json({ organization: orgResponse, status: 'Organization registered successfully' });
    } catch (err) {
        res.status(400).json({ status: formatValidationError(err) });
    }
});

// Login organization
router.post('/organizations/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'Email and password are required' });
        }

        const organization = await Organization.findOne({ email: email.toLowerCase() });
        if (!organization) {
            return res.status(400).json({ status: 'Organization not found' });
        }

        if (bcrypt.compareSync(password, organization.password)) {
            const orgResponse = organization.toObject();
            delete orgResponse.password;
            return res.json({ organization: orgResponse, status: 'Logged in successfully' });
        } else {
            return res.status(400).json({ status: 'Wrong password' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// ──────────────── Verification (Mock) ────────────────

// Verify Aadhaar (format validation + mark verified)
router.post('/organizations/verify-aadhaar', async (req, res) => {
    try {
        const { organizationId, aadhaarNumber } = req.body;

        if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
            return res.status(400).json({ status: 'Invalid Aadhaar number. Must be exactly 12 digits.' });
        }

        const organization = await Organization.findByIdAndUpdate(
            organizationId,
            { aadhaarNumber, aadhaarVerified: true },
            { new: true, runValidators: true }
        ).select('-password');

        if (!organization) {
            return res.status(404).json({ status: 'Organization not found' });
        }

        res.json({ organization, status: 'Aadhaar verified successfully' });
    } catch (err) {
        res.status(500).json({ status: formatValidationError(err) });
    }
});

// Send OTP (mock — always succeeds)
router.post('/organizations/send-otp', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ status: 'Invalid phone number. Must be exactly 10 digits.' });
        }
        res.json({ status: 'OTP sent successfully', message: 'For demo, use code: 123456' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Verify OTP (mock — accepts 123456)
router.post('/organizations/verify-otp', async (req, res) => {
    try {
        const { organizationId, otp } = req.body;

        if (!otp || otp.length !== 6) {
            return res.status(400).json({ status: 'OTP must be exactly 6 digits' });
        }

        if (otp !== '123456') {
            return res.status(400).json({ status: 'Invalid OTP' });
        }

        const organization = await Organization.findByIdAndUpdate(
            organizationId,
            { phoneVerified: true },
            { new: true }
        ).select('-password');

        if (!organization) {
            return res.status(404).json({ status: 'Organization not found' });
        }

        res.json({ organization, status: 'Phone verified successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// ──────────────── Donations ────────────────

// Razorpay webhook verification
router.post('/verification', (req, res) => {
    const secret = process.env.SECRET || 'satiate_secret';
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('Razorpay request is legit');
    }
    res.json({ status: 'ok' });
});

// Create donation via Razorpay
router.post('/donate', async (req, res) => {
    try {
        const { name, email, amountDonated, organizationId } = req.body;

        if (!name || name.trim().length < 2) {
            return res.status(400).json({ status: 'Name must be at least 2 characters' });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ status: 'Please enter a valid email address' });
        }

        const amount = Number(amountDonated);
        if (!amount || amount < 1) {
            return res.status(400).json({ status: 'Donation amount must be at least ₹1' });
        }
        if (amount > 500000) {
            return res.status(400).json({ status: 'Donation amount cannot exceed ₹5,00,000' });
        }

        const org = await Organization.findById(organizationId);
        if (!org) {
            return res.status(404).json({ status: 'Organization not found' });
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: shortid.generate(),
            payment_capture: 1,
        };

        const response = await razorpay.orders.create(options);

        const user = new User({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            amountDonated: amount,
            paymentDetails: response,
            organization: org.name,
        });
        await user.save();

        await Organization.findByIdAndUpdate(organizationId, {
            $inc: { raisedAmount: amount },
        });

        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            status: `Donation of ₹${amount.toLocaleString('en-IN')} recorded successfully`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;