const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('bufferCommands', true);
const DoctorSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
Doctor = mongoose.model('user', DoctorSchema);

module.exports = Doctor;
