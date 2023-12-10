const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
        await mongoose.connect(CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Could not connect to MongoDB', err));
            
        // await mongoose.connect('mongodb://127.0.0.1:27017/gym', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });

        // Enable Mongoose debug mode to print out queries
        mongoose.set('debug', true);

        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;