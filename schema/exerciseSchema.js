const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: String,
    sets: Number,
    reps: Number
});

module.exports = exerciseSchema;