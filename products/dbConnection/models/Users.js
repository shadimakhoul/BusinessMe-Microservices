const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    accountType: Boolean,
    created_at: Date,
    updated_at: Date,
})

module.exports = mongoose.model('user', UserSchema)