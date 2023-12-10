const mongoose = require('mongoose');
const userActivitySchema = require('../schema/userActivitySchema');

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

module.exports = UserActivity;