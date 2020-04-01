const mongoose = require('./db');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required :true
    },

    email: {
        type: String,
        required :true
    },

    password: {
        type: String,
        required :true
    },

    date: {
        type: Date,
        default: Date.now
    },

    _id: {
        type: String,
        required :true
    }
});


const UserSchema = mongoose.model('user', userSchema);
module.exports = UserSchema;
