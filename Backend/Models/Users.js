const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('bufferCommands', true);
const UserSchema = new Schema({
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
        type: String
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdbyHosp: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
User = mongoose.model('user', UserSchema);

module.exports = User;
