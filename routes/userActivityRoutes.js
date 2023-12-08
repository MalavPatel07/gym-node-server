const express = require('express');
const router = express.Router();
const userActivityDAO = require('../dao/userActivityDAO');

router.get('/:userId', async(req, res) => {
    try {
        const userActivity = await userActivityDAO.getUserActivityByUserId(req.params.userId);
        res.json(userActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async(req, res) => {
    try {
        const userActivities = await userActivityDAO.getAllUserActivities();
        res.json(userActivities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async(req, res) => {
    try {
        const newUserActivity = await userActivityDAO.createUserActivity(req.body);
        res.status(201).json(newUserActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:userId', async(req, res) => {
    try {
        const updatedUserActivity = await userActivityDAO.updateUserActivity(req.params.userId, req.body);
        res.json(updatedUserActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;