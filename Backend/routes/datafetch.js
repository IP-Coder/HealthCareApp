const express = require('express'); // Importing the express module
const UserSchema = require('../Models/Users');  // Importing the UserSchema
const router = express.Router(); // Creating a router
const { body, validationResult } = require('express-validator'); // Importing the express-validator module
const bcrypt = require('bcryptjs'); // Importing the bcryptjs module
const jwt = require('jsonwebtoken');    // Importing the jwt module
const fetchuser = require('../middleware/fetchuser');   // Importing the fetchuser middleware
const secret = 'mysecrettoken'; // Secret key for JWT
const nodemailer = require('nodemailer'); // Importing the nodemailer module
const functions = require('../Functions/function'); // Importing the function file
let success = false; // Variable to check if the user is created or not
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,auth-token");
    next();
}); // Middleware to allow cross origin requests
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); // Middleware to allow cross origin requests
router.get('/table', async (req, res) => {
    try {
        const entries = await UserSchema.find({ createdbyHosp: req.body.createdbyHospital });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/getuser', fetchuser,
    async (req, res) => {
        try {
            userId = req.user.id;
            const user = await UserSchema.findById(userId).select("-password");//-password means paasword nhi aayega 
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }

    });
module.exports = router;