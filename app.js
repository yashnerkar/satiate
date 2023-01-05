require('dotenv').config();
const express = require('express');
const organization = require('./routes/organization');
const User = require('./models/user');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/", organization)
// connection to database
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});

try {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to database');
    })
} catch (err) {
    console.log(err);
}


app.listen(process.env.PORT || 8000, () => {
    console.log(`server started  at ${process.env.PORT || 8000}`);
});