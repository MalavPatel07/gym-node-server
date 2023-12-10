const express = require('express');
const session = require('express-session');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const userDetailsRoutes = require('./routes/userDetailsRoutes');
const userActivityRoutes = require('./routes/userActivityRoutes');
const excerciseRoutes = require('./routes/exerciseRoutes');
const trainerRoutes = require('./routes/trainerRoutes');

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
connectDB();
app.use('/users', userRoutes);
app.use('/userDetails', userDetailsRoutes);
app.use('/userActivity', userActivityRoutes);
app.use('/exercises', excerciseRoutes);
app.use('/trainerdetails', trainerRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});