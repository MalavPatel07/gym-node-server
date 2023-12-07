const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDAO');
const userDetailsDao = require('../dao/userDetailsDAO');

router.post('/register', async(req, res) => {
    try {
        const newUser = await userDao.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async(req, res) => {
    try {
        console.log('Login Request:', req.body);
        const user = await userDao.findUserByEmail(req.body.email);
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.user_id = user.user_id;
        req.session.userType = user.userType;
        console
        const userDetails = await userDetailsDao.findUserDetailsByUserId(user.user_id)
        console.log(userDetails);
        return res.status(200).json({ success: true, userDetails, session: { user_id: req.session.user_id, userType: req.session.userType } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Could not log out');
        } else {
            res.send('Logged out');
        }
    });
});
module.exports = router;