// const Twilio = require('twilio');
// accountSid = "AC78db352d5478675f46061eec4983742f";
// authToken = "3d9b8c7c42b24b0dbb8b5bb80cfaa9c7";
// const client = new Twilio(accountSid, authToken);

// const phoneNumber = '+7388476701'; // the phone number you want to lookup
// if (Twilio.PhoneNumber.isValid(phoneNumber)) {
//     // code to lookup phone number
//     client.lookups.phoneNumbers(phoneNumber)
//         .fetch({ type: ['carrier', 'caller-name'] })
//         .then(phoneNumber => {
//             console.log(phoneNumber.countryCode); // will output the country code for the phone number
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }
// else {
//     console.log('Invalid phone number');
// }
// const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// const phoneNumber = '+917388476703';

// try {
//     const number = phoneUtil.parse(phoneNumber);
//     const regionCode = phoneUtil.getRegionCodeForNumber(number);
//     console.log(regionCode);
// } catch (e) {
//     console.log(e);
// }

// function MyComponent() {


//     return (
//         <div>
//             <ul>
//                 <li key={id}>Item 1</li>
//                 <li key={shortid.generate()}>Item 2</li>
//                 <li key={shortid.generate()}>Item 3</li>
//             </ul>
//         </div>
//     );
// }

// function generateOTP() {
//     const array = new Uint32Array(1); // array to store the random number
//     window.crypto.getRandomValues(array); // fill the array with cryptographically secure random values
//     const otp = array[0] % 1000000; // generate a random number between 0 and 999,999
//     return String(otp).padStart(6, '0'); // format the OTP string to always have 6 digits
// }
// console.log("OTP: " + generateOTP());

// const crypto = require('crypto');

// function generateOTP() {
//     const buffer = crypto.randomBytes(3); // generate 3 bytes of random data
//     const otp = buffer.readUIntBE(0, 3) % 1000000; // convert the random data to a number and reduce it to the range 0-999999
//     return String(otp).padStart(6, '0'); // format the OTP string to always have 6 digits
// }
// console.log("OTP: " + generateOTP());

// console.log("Hello world")
// const express = require('express');
// const router = express.Router();
// const twilio = require('twilio');
// const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// router.post('/send-otp', (req, res) => {
//     const { phoneNumber } = req.body;
//     const otp = Math.floor(Math.random() * 1000000);
//     client.messages.create({
//         from: 'whatsapp:+14155238886',
//         to: `whatsapp:${phoneNumber}`,
//         body: `Your OTP is ${otp}`,
//     }).then(message => {
//         // Save the OTP in a database for later verification
//         res.json({ message: 'OTP sent successfully' });
//     }).catch(error => {
//         res.json({ error });
//     });
// });

// module.exports = router;
const functions = require('../Functions/function');
// import { generateOTP } from '../Functions/function';
// const otp = functions.generatePrimaryKey('shri@gmail.com');
const otp = functions.generateOTP();

console.log(otp);