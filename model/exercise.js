const mongoose = require('mongoose');
const exerciseSchema = require('../schema/exerciseSchema');

const exercises = mongoose.model('exercises', exerciseSchema);

module.exports = exercises;