const express = require('express');
const router = express.Router();
const exerciseDAO = require('../dao/exerciseDAO');


router.get('/', async(req, res) => {
    try {
        console.log("Hello")
        const exercises = await exerciseDAO.getAllExercises();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;