const express = require('express');
const User = require('../Models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const secret = 'mysecrettoken';
let success = false;
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//Request to create a user
router.post('/createuser', [
    body('name', 'Name is required').not().isEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        //Error handling
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // If no error occurred 
        try {
            let mailuser = await User.findOne({ email: req.body.email });
            let phoneuser = await User.findOne({ mobile: req.body.mobile });
            if (mailuser || phoneuser) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            const salt = await bcrypt.genSalt(10);
            const SecurePassword = await bcrypt.hash(req.body.password, salt);
            // Creating user to the database
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: SecurePassword,
                mobile: req.body.mobile,
                type: req.body.type


            })
            const data = {
                user: {
                    id: user.id
                }
            }
            // Creating auth token 
            const authtoken = jwt.sign(data, secret)
            // Sending authtoken
            res.send({ success: true, authtoken })
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }

    });

//Request to authenticate a user
router.post('/authuser', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        //Error handling
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {

            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentialss' }] });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            // Creating auth token 
            const authtoken = jwt.sign(data, secret)
            // Sending authtoken
            res.send({ success: true, authtoken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    });


//Request to authenticate a user
router.post('/getuser', fetchuser,
    async (req, res) => {
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }

    });
module.exports = router;