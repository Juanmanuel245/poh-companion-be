const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: {
        type: String, 
        require: true
    },
    role: {
        type: String, 
        require: false
    },
    password: {
        type: String,
        require: true
    }

});

module.exports = model('User', UserSchema );