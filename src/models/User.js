const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../config/env.js')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});
userSchema.pre('save', function(next){
    bcrypt.hash(this.password, SALT_ROUNDS).then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    })
    
})
const User = mongoose.model('User', userSchema);

module.exports = User;