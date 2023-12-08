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

module.exports = {
    createUser,
    findUserByEmail,
    findUserByUserId
};