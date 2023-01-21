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
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const phoneNumber = '+917388476703';

try {
    const number = phoneUtil.parse(phoneNumber);
    const regionCode = phoneUtil.getRegionCodeForNumber(number);
    console.log(regionCode);
} catch (e) {
    console.log(e);
}
