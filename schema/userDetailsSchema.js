const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    user_id: String,
    firstname: String,
    lastname: String,
    phone: String,
    dob: Date,
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    membershipType: String,
    dateOfJoining: Date,
    testimonial: String,
    favourites: { type: Array, default: [] }
});

module.exports = userDetailsSchema;