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

//Request to create a USER
router.post('/createuser', [
    body('name', 'Name is required').not().isEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        //Error handling
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // If error occurred
        }
        // If no error occurred 
        try {
            // let mailuser = await UserSchema.findOne({ email: req.body.email });
            let phoneuser = await UserSchema.findOne({ mobile: req.body.mobile });
            if (phoneuser) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] }); // If user already exists
            }
            const salt = await bcrypt.genSalt(10);
            const SecurePassword = await bcrypt.hash(req.body.password, salt);
            const UID = functions.generateUID(req.body.mobile);
            let email = req.body.email || null; // If email is not provided
            // Creating user to the database
            user = await UserSchema.create({
                uid: UID,
                name: req.body.name,
                email: email,
                password: SecurePassword,
                mobile: req.body.mobile,
                type: req.body.type,
                createdbyHosp: req.body.createdbyHosp


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
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }

    });

// Request to authenticate a user
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

            const user = await UserSchema.findOne({ email: req.body.email })
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


//Sending mail to reset password

router.post('/send-email', (req, res) => {
    const { recipient, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email-address@gmail.com',
            pass: 'your-email-password'
        }
    });

    let mailOptions = {
        from: 'your-email-address@gmail.com',
        to: recipient,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ message: 'Error sending email' });
        } else {
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

router.post('/check-login', (req, res) => {
    // check if the user is logged in, e.g. by checking the presence of a JWT token
    const token = req.body.token;
    // in the request headers
    // if the user is logged in:
    console.log(token);
    if (token) {
        res.json({ isLoggedIn: true });
    }
    // if the user is not logged in:
    else {
        res.json({ isLoggedIn: false });
    }
});
module.exports = router;


