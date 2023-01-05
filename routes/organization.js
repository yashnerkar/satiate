const express = require('express');
const router = express.Router();
const Organization = require('../models/organizations');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const saltRounds = 10;


router.post('/', async (req, res) => {
    const countryName = await req.body.country;
    const organizations = await Organization.find({ location: countryName });
    if (!organizations) {
        return res.status(400).json({ msg: 'Organization does not exist' });
    } else {
        await res.json({
            organizations,
            status: 'Organizations Found successfully'
        });
    }
});



router.post('/register', async (req, res) => {
    const { name, email, phoneNumber, password, location, paypalID } = req.body;
    const passwordHash = await bcrypt.hashSync(password, saltRounds);
    const organization = new Organization({
        name: name,
        email: email,
        location: location,
        phoneNumber: phoneNumber,
        password: passwordHash,
        paypalID: paypalID,
    });
    console.log(organization);
    await organization.save();

    await res.json({
        organization,
        status: 'organization added successfully'
    });
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const organization = await Organization.findOne({ email: email });
    if (!organization) {
        return res.status(400).json({
            status: 'organization not found'
        });
    } else {
        if (bcrypt.compareSync(password, organization.password)) {
            return res.status(200).json({
                organization,
                status: `${organization.name}logged in successfully`
            });
        } else {
            return res.status(400).json({
                status: 'Wrong password'
            });
        }
    }
})


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

router.post('/verification', (req, res) => {
    // do a validation
    const secret = process.env.SECRET

    console.log(req.body)

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
    } else {
        // pass it
    }
    res.json({ status: 'ok' })
})

router.post('/razorpay', async (req, res) => {
    const { name, email, amountDonated, organization } = await req.body;

    const payment_capture = 1;
    const amount = amountDonated;
    const currency = "INR";
    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        const user = new User({
            name: name,
            email: email,
            amountDonated: amountDonated,
            paymentDetails: response,
            organization: organization
        })
        console.log(user);
        await user.save();
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            status: `Donation of ${user.amountDonated} done successfully`
        })
    } catch (error) {
        console.log(error)
    }
})


router.get('/server/organizations/:name', async (req, res) => {
    const name = req.params.name;
    // console.log(name);
    const organizationName = name.split(':')[1];
    // console.log(organizationName);
    const data = await Organization.findOne({ name: organizationName });
    const user = await User.find({ organization: organizationName });
    console.log(user);
    // console.log(data);
    res.json({
        user,
        data,
        status: 'Organization Found'
    });
});



module.exports = router;