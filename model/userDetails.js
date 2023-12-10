const mongoose = require('mongoose');
const userDetailsSchema = require('../schema/userDetailsSchema');

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;