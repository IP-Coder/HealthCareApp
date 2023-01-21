const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('bufferCommands', true);
const UserSchema = new Schema({
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
        required: true,
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
User = mongoose.model('user', UserSchema);

module.exports = User;
