const express = require('express');
const router = express.Router();
const userActivityDAO = require('../dao/userActivityDAO');

router.get('/:userId', async (req, res) => {
    try {
        const userActivity = await userActivityDAO.getUserActivityByUserId(req.params.userId);
        res.json(userActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const userActivities = await userActivityDAO.getAllUserActivities();
        res.json(userActivities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUserActivity = await userActivityDAO.createUserActivity(req.body);
        res.status(201).json(newUserActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const updatedUserActivity = await userActivityDAO.updateUserActivity(req.params.userId, req.body);
        res.json(updatedUserActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/updateWeight/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { current_weight, target_weight } = req.body;
        console.log(current_weight);
        console.log(target_weight);
        let userActivity = await userActivityDAO.getUserActivityByUserId(userId);

        if (!userActivity) {
            return res.status(404).json({ message: "User activity not found" });
        }

        userActivity.current_weight = current_weight;
        userActivity.target_weight = target_weight;

        userActivity.weight_history.push({
            weight: current_weight
        });

        const updatedUserActivity = await userActivity.save();

        res.status(200).json(updatedUserActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const trainerDetailsDao = require('../dao/trainerDetailsDao');

router.post('/assignTrainer', async (req, res) => {
    const { userId, trainerId } = req.body;

    try {
        await userActivityDAO.updateTrainerForUser(userId, trainerId);
        await trainerDetailsDao.addMemberToTrainer(trainerId, userId);
        res.json({ message: 'Trainer assigned successfully' });
    } catch (error) {
        console.error('Error assigning trainer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;