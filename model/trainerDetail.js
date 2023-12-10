const mongoose = require('mongoose');
const trainerDetailSchema = require('../schema/trainerDetailSchema');

const TrainerDetail = mongoose.model('TrainerDetail', trainerDetailSchema);

module.exports = TrainerDetail;