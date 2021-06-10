const mongoose = require('mongoose');

//registration Schema
var registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    organizationName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var users = mongoose.model('user', registrationSchema);

module.exports = {users};