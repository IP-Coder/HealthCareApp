const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('bufferCommands', true);
const PatientSchema = new Schema({
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
    gender: {
        type: String,
        required: true

    },
    age: {
        type: String,
        required: true
    },
    fullbodyscreening: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;