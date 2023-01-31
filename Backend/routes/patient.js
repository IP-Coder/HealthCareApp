const express = require('express');
const Patient = require('../Models/Patient');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = 'mysecrettoken';
const twilio = require('twilio');
const client = new twilio("AC78db352d5478675f46061eec4983742f", "8da7005a3bca786ecbbfd465da846bd7");
const functions = require('../Functions/function');
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.post('/getotp', [
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
            else {
                const code = functions.generateOTP();
                // Save the OTP to the database
                const { phoneNumber } = req.body;
                // res.send({ code });
                client.messages.create({
                    from: 'whatsapp:+917388476701',
                    to: `whatsapp:${phoneNumber}`,
                    body: `Your OTP is ${code}`,
                }).then(message => {
                    // Save the OTP in a database for later verification
                    res.json({ message: 'OTP sent successfully' });
                }).catch(error => {
                    res.json({ error });
                });
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
router.post('/addpatient', [
    body('pname', 'Name is required').not().isEmpty(),
    body('mobile', 'Please enter a password with 6 or more characters').isLength({ min: 10 })
], async (req, res) => {
    const errors = validationResult(req);
    //Error handling
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // If error occurred
    }
    // If no error occurred 
    console.log(req.body);
    try {
        let patient = await Patient.findOne({ mobile: req.body.mobile });
        if (patient) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] }); // If user already exists
        }
        const UID = functions.generateUID(req.body.mobile);
        let email = req.body.email || null; // If email is not provided
        // Creating user to the database
        user = await Patient.create({
            uid: UID,
            name: req.body.pname,
            mobile: req.body.mobile,
            gender: req.body.gender,
            age: req.body.age,
            fullbodyscreening: req.body.dieses
        }) // Creating user to the database
        const data = {
            user: {
                id: user.id
            }
        } // Creating data for JWT
        // Creating auth token 
        const authtoken = jwt.sign(data, secret)
        // Sending authtoken
        res.send({ success: true, authtoken }) // Sending authtoken
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

});
module.exports = router;
