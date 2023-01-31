const express = require('express'); // Importing the express module
const UserSchema = require('../Models/Users');  // Importing the UserSchema
const router = express.Router(); // Creating a router
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); // Middleware to allow cross origin requests
router.get('/table', async (req, res) => {
    try {
        const entries = await UserSchema.find({ type: 'Doctor' });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;