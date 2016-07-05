// load the things we need
var mongoose = require('mongoose');
var mongooseAutoIncrement = require('mongoose-auto-increment');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    created_at       : { type: Date, default: Date.now },
    updated_at       : { type: Date, default: Date.now },
    local            : {
        email        : { type: String, unique: true },
        password     : String
    },
    facebook         : {
        id           : { type: String, unique: true },
        token        : String,
        email        : { type: String, unique: true },
        name         : String
    },
    google           : {
        id           : { type: String, unique: true },
        token        : String,
        email        : { type: String, unique: true },
        name         : String
    }
}, { strict: 'throw'});

// generating a hash
userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.plugin(mongooseAutoIncrement.plugin, 'User');
module.exports = mongoose.model('User', userSchema);
