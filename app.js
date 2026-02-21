require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const organizationRoutes = require('./routes/organization');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API routes
app.use('/api', organizationRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, './client/dist')));
app.get('*', function (_, res) {
    res.sendFile(
        path.join(__dirname, './client/dist/index.html'),
        function (err) {
            if (err) res.status(500).send(err);
        }
    );
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Database connection error:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});