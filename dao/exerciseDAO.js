const exercise = require('../model/exercise');

const getAllExercises = async() => {
    return await exercise.find({});
};

module.exports = {
    getAllExercises
};