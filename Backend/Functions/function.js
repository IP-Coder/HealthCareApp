const crypto = require('crypto');
//Function to genrtae OTP
const generateOTP = () => {
    const buffer = crypto.randomBytes(3); // generate 3 bytes of random data
    const otp = buffer.readUIntBE(0, 3) % 1000000; // convert the random data to a number and reduce it to the range 0-999999
    return String(otp).padStart(6, '0'); // format the OTP string to always have 6 digits
}
const generateUID = (input) => {
    const inputBuffer = Buffer.from(input);
    const hash = crypto.createHash('sha256').update(inputBuffer).digest("hex");
    return hash.substring(0, 32);
}
module.exports = { generateOTP, generateUID };
