const User = require('../model/user');

const createUser = async(userData) => {
    const user = new User(userData);
    return await user.save();
};

const findUserByEmail = async(email) => {
    return await User.findOne({ email });
};

const findUserByUserId = async(userId) => {
    console.log("Finding user for user_id:", userId);
    try {
        const userData = await User.findOne({ user_id: userId }).exec();
        return userData;
    } catch (error) {
        console.error("Error finding user details:", error);
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const allUsers = await User.find({});
        console.log(allUsers);
        return allUsers;
    } catch (error) {
        console.error("Error retrieving all users: ", error);
        throw error;
    }
};

const updateUser = async (userId, updateData) => {
    return await User.findOneAndUpdate({ user_id: userId }, updateData, { new: true });
};

const deleteUser = async (userId) => {
    try {
        const result = await User.deleteOne({ user_id: userId });
        if (result.deletedCount === 0) {
            throw new Error('No user found with the specified user_id.');
        }
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserByUserId,
    updateUser,
    deleteUser,
    getAllUsers
};