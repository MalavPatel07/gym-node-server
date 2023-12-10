const UserActivity = require('../model/userActivity');

const getUserActivityByUserId = async(userId) => {
    return await UserActivity.findOne({ user_id: userId });
};

const getAllUserActivities = async() => {
    return await UserActivity.find({});
};

const createUserActivity = async(activityData) => {
    const userActivity = new UserActivity(activityData);
    return await userActivity.save();
};

const updateUserActivity = async(userId, updateData) => {
    return await UserActivity.findOneAndUpdate({ user_id: userId }, updateData, { new: true });
};

const deleteUserActivity = async (userId) => {
    try {
        const result = await UserActivity.deleteOne({ user_id: userId });
        if (result.deletedCount === 0) {
            throw new Error('No user activity found with the specified user_id.');
        }
        return result;
    } catch (error) {
        console.error("Error deleting user activity:", error);
        throw error;
    }
};
async function updateTrainerForUser(userId, trainerId) {
    await UserActivity.updateOne({ user_id: userId }, { $set: { trainer: trainerId } });
  }

module.exports = {
    updateTrainerForUser,
    getUserActivityByUserId,
    getAllUserActivities,
    createUserActivity,
    updateUserActivity,
    deleteUserActivity
};