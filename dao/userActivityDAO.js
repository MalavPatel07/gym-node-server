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

module.exports = {
    getUserActivityByUserId,
    getAllUserActivities,
    createUserActivity,
    updateUserActivity
};