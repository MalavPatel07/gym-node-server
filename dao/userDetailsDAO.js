const UserDetails = require('../model/userDetails');

const createUserDetails = async(userDetailsData) => {
    const userDetails = new UserDetails(userDetailsData);
    return await userDetails.save();
};

const findUserDetailsByUserId = async(userId) => {
    console.log("Finding user details for user_id:", userId);
    try {
        const userDetails = await UserDetails.findOne({ user_id: userId }).exec();
        return userDetails;
    } catch (error) {
        console.error("Error finding user details:", error);
        throw error;
    }
};

const getAllUserDetailsWithCount = async() => {
    try {
        const allUserDetails = await UserDetails.find({});
        console.log(allUserDetails);
        const count = allUserDetails.length;
        console.log(count);
        return { allUserDetails, count };
    } catch (error) {
        console.error("Error retrieving all user details with count:", error);
        throw error;
    }
};

module.exports = {
    createUserDetails,
    findUserDetailsByUserId,
    getAllUserDetailsWithCount
};