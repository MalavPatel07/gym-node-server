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

        res.status(201).json({ message: 'Registration successful' });
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

module.exports = router;