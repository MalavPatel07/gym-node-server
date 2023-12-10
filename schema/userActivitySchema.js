const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    user_id: String,
    gym_sessions: Number,
    gym_hours: Number,
    current_weight: Number,
    target_weight: Number,
    trainer: String,
    weight_history: [{
        date: { type: Date, default: Date.now },
        weight: Number
    }]
});

module.exports = userActivitySchema;