require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Organization = require('./models/organizations');

const saltRounds = 10;

const seedOrganizations = [
    {
        name: 'Akshaya Patra Foundation',
        email: 'info@akshayapatra.org',
        phoneNumber: '9876543210',
        password: bcrypt.hashSync('password123', saltRounds),
        state: 'Karnataka',
        upiID: 'akshayapatra@sbi',
        description: 'The Akshaya Patra Foundation is a non-profit organisation that runs the mid-day meal scheme in government schools across India, feeding over 1.8 million children every day.',
        category: 'hunger',
        aadhaarVerified: true,
        phoneVerified: true,
        targetAmount: 500000,
        raisedAmount: 234500,
    },
    {
        name: 'Teach For India',
        email: 'contact@teachforindia.org',
        phoneNumber: '9876543211',
        password: bcrypt.hashSync('password123', saltRounds),
        state: 'Maharashtra',
        upiID: 'teachforindia@icici',
        description: 'Teach For India is a nationwide movement of outstanding college graduates and young professionals who commit two years to teach full-time in under-resourced schools.',
        category: 'education',
        aadhaarVerified: true,
        phoneVerified: true,
        targetAmount: 300000,
        raisedAmount: 178000,
    },
    {
        name: 'Goonj',
        email: 'info@goonj.org',
        phoneNumber: '9876543212',
        password: bcrypt.hashSync('password123', saltRounds),
        state: 'Delhi',
        upiID: 'goonj@hdfc',
        description: 'Goonj is an award-winning non-profit focused on urban-rural divide, taking urban surplus material to the last mile rural communities as a development resource.',
        category: 'disaster',
        aadhaarVerified: true,
        phoneVerified: false,
        targetAmount: 200000,
        raisedAmount: 89000,
    },
    {
        name: 'Wildlife SOS',
        email: 'info@wildlifesos.org',
        phoneNumber: '9876543213',
        password: bcrypt.hashSync('password123', saltRounds),
        state: 'Uttar Pradesh',
        upiID: 'wildlifesos@axis',
        description: 'Wildlife SOS is a conservation non-profit working towards protecting Indian wildlife, rescuing animals in distress and preserving natural habitats.',
        category: 'animals',
        aadhaarVerified: true,
        phoneVerified: true,
        targetAmount: 400000,
        raisedAmount: 312000,
    },
    {
        name: 'Smile Foundation',
        email: 'info@smilefoundation.org',
        phoneNumber: '9876543214',
        password: bcrypt.hashSync('password123', saltRounds),
        state: 'Delhi',
        upiID: 'smilefdn@kotak',
        description: 'Smile Foundation works for the welfare of underprivileged children and their families through intensive programmes focused on education, healthcare, livelihood and women empowerment.',
        category: 'healthcare',
        aadhaarVerified: false,
        phoneVerified: true,
        targetAmount: 250000,
        raisedAmount: 145000,
    },
    {
        name: 'SankalpTaru Foundation',
        email: 'info@sankalptaru.org',
        phoneNumber: '9876543215',
        password: bcrypt.hashSync('password123', saltRounds),
        state: 'Rajasthan',
        upiID: 'sankalptaru@sbi',
        description: 'SankalpTaru Foundation plants trees to combat climate change and restore degraded land across India, enabling individuals and organizations to offset their carbon footprint.',
        category: 'environment',
        aadhaarVerified: true,
        phoneVerified: true,
        targetAmount: 150000,
        raisedAmount: 98000,
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');

        await Organization.deleteMany({});
        console.log('Cleared existing organizations');

        await Organization.insertMany(seedOrganizations);
        console.log(`Seeded ${seedOrganizations.length} organizations`);

        await mongoose.disconnect();
        console.log('Done! Disconnected from database.');
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
