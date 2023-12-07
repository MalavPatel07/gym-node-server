const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gym', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Enable Mongoose debug mode to print out queries
        mongoose.set('debug', true);

        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;