var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({

    email: {
        type: String,
        required:true,        
    },
    password: {
        type: String,
        required:true
    },

});

var User = module.exports = mongoose.model('User', userSchema);
