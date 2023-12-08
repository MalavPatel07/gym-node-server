const express = require('express');
const session = require('express-session');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const userDetailsRoutes = require('./routes/userDetailsRoutes');
const userActivityRoutes = require('./routes/userActivityRoutes');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'mySuperSecretKey123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

connectDB();

app.use('/users', userRoutes);
app.use('/userDetails', userDetailsRoutes);
app.use('/userActivity', userActivityRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});