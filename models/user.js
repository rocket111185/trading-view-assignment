'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    favouriteSymbols: {
        type: [String]
    }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
