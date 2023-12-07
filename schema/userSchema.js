const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: String,
    email: String,
    password: String,
    userType: String
});

module.exports = userSchema;