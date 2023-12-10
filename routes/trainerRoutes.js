const express = require('express');
const router = express.Router();
const trainerDetailsDao = require('../dao/trainerDetailsDao');

router.get('/trainerForUser/:userId', async (req, res) => {
    try {
        const trainerForUser = await trainerDetailsDao.getTrainerForUser(req.params.userId);
        console.log(trainerForUser);
        if (trainerForUser) {
            res.json(trainerForUser);
        } else {
            res.status(404).json({ message: 'No trainer found for this user.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/trainMembers/:userId', async (req, res) => {
    try {
        const trainerUserId = req.params.userId;
        const membersOfTrainer = await trainerDetailsDao.getMembersOfTrainer(trainerUserId);
        res.json(membersOfTrainer);
    } catch (error) {
        console.error('Error fetching members of the trainer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/allTrainers', async (req, res) => {
    try {
        const trainers = await trainerDetailsDao.getAllTrainersWithUserDetails();
        res.json(trainers);
    } catch (error) {
        console.error('Error fetching all trainers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;