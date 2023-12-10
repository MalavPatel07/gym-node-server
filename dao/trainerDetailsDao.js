const TrainerDetail = require('../model/trainerDetail');
const UserDetail = require('../model/userDetails');

async function getTrainerForUser(userId) {
    const trainerDetail = await TrainerDetail.findOne({ members: userId }).exec();
    if (!trainerDetail) {
        return null;
    }

    const userDetails = await UserDetail.findOne({ user_id: trainerDetail.user_id }).exec();
    return userDetails ? {
        trainerId: userDetails.user_id,
        trainerName: `${userDetails.firstname} ${userDetails.lastname}`,
    } : null;
}

async function getMembersOfTrainer(trainerUserId) {
    const trainerDetail = await TrainerDetail.findOne({ user_id: trainerUserId });
    return trainerDetail ? trainerDetail.members : [];
}

async function getAllTrainersWithUserDetails() {
    const trainers = await TrainerDetail.find({});

    const trainersWithDetails = await Promise.all(trainers.map(async (trainer) => {
        const userDetails = await UserDetail.findOne({ user_id: trainer.user_id });
        return {
            ...trainer.toObject(),
            userDetails: userDetails ? userDetails.toObject() : null
        };
    }));

    return trainersWithDetails;
}

async function addMemberToTrainer(trainerId, memberId) {
    await TrainerDetail.updateOne({ user_id: trainerId }, { $addToSet: { members: memberId } });
  }

module.exports = {
    addMemberToTrainer,
    getTrainerForUser,
    getMembersOfTrainer,
    getAllTrainersWithUserDetails
};