const mongoose = require('mongoose');

const trainerDetailSchema = new mongoose.Schema({
    user_id: String,
    specialty: String,
    members: [String],
});

module.exports = trainerDetailSchema;