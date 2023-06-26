const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    filiation: String,
    name: String,
    level: String,
    active: Boolean,
    dateCreated: String,
    lastAccess: String,
    favorites: [Number]
  });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema)