var mongoose = require('mongoose');
const User = require('./users');

var adsSchema = mongoose.Schema({

    _userId: { type: String },
    title: {
        type: String,

    },
    category: {
        type: String,

    },
    price: {
        type: String,

    },
    condition: {
        type: String,

    },
    description: {
        type: String,

    },
    photo: [String],
    name: {
        type: String,

    },
    phone: {
        type: String,

    },
    province: {
        type: String,

    },
    city: {
        type: String,
    },
    date: {
        type: String,
    },
    views: {type:Number}


});

var Ads = module.exports = mongoose.model('Ads', adsSchema);