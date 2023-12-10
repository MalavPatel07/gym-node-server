const UserDetails = require('../model/userDetails');

const createUserDetails = async (userDetailsData) => {
    const userDetails = new UserDetails(userDetailsData);
    return await userDetails.save();
};

const findUserDetailsByUserId = async (userId) => {
    console.log("Finding user details for user_id:", userId);
    try {
        const userDetails = await UserDetails.findOne({ user_id: userId });
        return userDetails;
    } catch (error) {
        console.error("Error finding user details:", error);
        throw error;
    }
};

const getAllUserDetailsWithCount = async () => {
    try {
        const allUserDetails = await UserDetails.find({});
        const count = allUserDetails.length;
        return { allUserDetails, count };
    } catch (error) {
        console.error("Error retrieving all user details with count:", error);
        throw error;
    }
};

const updateUserDetails = async (userId, updateData) => {
    return await UserDetails.findOneAndUpdate({ user_id: userId }, updateData, { new: true });
};

const deleteUserDetails = async (userId) => {
    try {
        const result = await UserDetails.deleteOne({ user_id: userId });
        if (result.deletedCount === 0) {
            throw new Error('No user details found with the specified user_id.');
        }
        return result;
    } catch (error) {
        console.error("Error deleting user details:", error);
        throw error;
    }
};

module.exports = {
    createUserDetails,
    findUserDetailsByUserId,
    getAllUserDetailsWithCount,
    updateUserDetails,
    deleteUserDetails
};