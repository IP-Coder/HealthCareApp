const express = require('express');
const User = require('../Models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const secret = 'mysecrettoken';
const nodemailer = require('nodemailer');
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.post('/patientlogin', [
    body('mobile', 'Please include a valid mobile').isMobilePhone().isLength({ min: 10 })
],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        //Error handling
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            const user = await User.findOne({ mobile: req.body.mobile })
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentialss' }] });
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
router.get('/getotp', async (req, res) => {
    const code = generateOTP();
    // Set the OTP to expire in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    // Save the OTP to the database
    const otp = new OTP({ code, expiresAt });
    await otp.save();
    res.send({ code });
});
module.exports = router;
