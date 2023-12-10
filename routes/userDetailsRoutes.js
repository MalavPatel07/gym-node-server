const express = require('express');
const router = express.Router();
const userDetailsDao = require('../dao/userDetailsDAO');

router.post('/', async(req, res) => {
    try {
        const newUserDetails = await userDetailsDao.createUserDetails(req.body);
        res.status(201).json(newUserDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const { createUser } = require('../dao/userDAO');
const { createUserDetails } = require('../dao/userDetailsDAO');
const { getAllUserDetailsWithCount } = require('../dao/userDetailsDAO');
const { findUserDetailsByUserId } = require('../dao/userDetailsDAO');
const { createUserActivity } = require('../dao/userActivityDAO');

router.post('/combinedRegister', async(req, res) => {
    console.log("Hello")
    try {
        const user = await createUser({
            user_id: req.body.user_id,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType
        });
        console.log(user);
        await createUserDetails({
            user_id: user.user_id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            dob: req.body.dob,
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            membershipType: req.body.membershipType,
            dateOfJoining: req.body.dateOfJoining,
        });

        await createUserActivity({
            user_id: req.body.user_id,
            gym_sessions: 0,
            gym_hours: 0,
            weight_history: [],
            current_weight: 0,
            target_weight: 0,
            trainer: ""
        });

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

const { updateUser } = require('../dao/userDAO');
const { updateUserDetails } = require('../dao/userDetailsDAO');

router.put('/updateUser/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        await updateUser(userId, {
            email: req.body.email,
            userType: req.body.userType
        });

        await updateUserDetails(userId, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            dob: req.body.dob,
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            membershipType: req.body.membershipType,
            dateOfJoining: req.body.dateOfJoining,
        });

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/updateUserTestimonial/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        await updateUserDetails(userId, {
            testimonial: req.body.testimonial,
        });

        res.status(200).json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/allUsersWithCount', async(req, res) => {
    console.log("Hello");
    try {
        const result = await getAllUserDetailsWithCount();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const { deleteUserDetails } = require('../dao/userDetailsDAO');
const { deleteUser } = require('../dao/userDAO'); 
const { deleteUserActivity } = require('../dao/userActivityDAO'); 

router.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        await deleteUserDetails(userId);

        await deleteUser(userId);

        res.status(200).json({ message: 'User and associated data deleted successfully' });
    } catch (error) {
        await deleteUserActivity(userId);
        res.status(500).json({ message: error.message });
    }
});

router.post('/add-to-favorites', async (req, res) => {
    
    const { user_id, mealId } = req.body;
    
    try {
        const user = await findUserDetailsByUserId(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.favourites.includes(mealId)) {
            // console.log(user);
            user.favourites.push(mealId);
            await user.save();

            return res.status(200).json({ success: true, message: 'Meal added to favorites' });
        } else {
            user.favourites = user.favourites.filter(id => id !== mealId);
            await user.save();

            return res.status(200).json({ success: true, message: 'Meal removed from favorites' });
        }
    } catch (error) {
        console.error('Error adding/removing meal to/from favorites:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/favourites/:id', async (req, res) => {
    console.log('hii');
    try {
        const user = await findUserDetailsByUserId(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user);

        res.status(200).json({ favorites: user.favourites });
    } catch (error) {
        console.error('Error Getting favourites', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;