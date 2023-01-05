const express = require('express');
const router = express.Router();
const User = require('../models/user');




// router.post('/registeruser', async(req, res) => {
//     const { name, email, phoneNumber, organization, amountDonated, paypalID } = req.body;
//     const organizations = await organization.find({ name: organization });
//     if (!organizations) {
//         return res.status(400).json({ msg: 'Organization does not exist' });
//     } else {
//         const user = new User({
//             name: name,
//             email: email,
//             amountDonated: amountDonated,
//             organization: organization,
//             phoneNumber: phoneNumber,
//             paypalID: paypalID,
//         });
//         console.log(user);
//         await user.save();

//         await res.json({
//             user,
//             status: 'User added successfully'
//         });
//     }
// })

module.exports = router;