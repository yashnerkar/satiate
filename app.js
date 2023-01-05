require('dotenv').config();
const express = require('express');
const user = require('./routes/user');
const organization = require('./routes/organization');
const User = require('./models/user');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const shortid = require('shortid');
const Razorpay = require('razorpay');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(require(path.join(__dirname, "routes/organization")));
app.use(require(path.join(__dirname, "routes/user")));
// connection to database
app.use(express.static(path.join(__dirname, "./client/build")));
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
try {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to database');
    })
} catch (err) {
    console.log(err);
} // end of connection to database




app.listen(process.env.PORT || 8000, () => {
    console.log(`server started  at ${process.env.PORT || 8000}`);
});