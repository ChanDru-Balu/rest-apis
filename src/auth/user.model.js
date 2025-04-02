const express = require('express');

const mongoose = require('mongoose');
const { validate } = require('../todo/todo.model');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        // require: true ,
        unique: true ,
        validate: (value)=>{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message : props => `${props.value} is not a valid email address!`
    } ,
    mobile: {
        type: Number,
        unique: true ,
    },
    userName: {
        type:String,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

userSchema.pre('validate', function (next) {
    if (!this.email && !this.mobile && !this.username) {
        this.invalidate('email', 'At least one of email or mobile  0r user name  must be provided!');
        this.invalidate('mobile', 'At least one of email or mobile  0r user name  must be provided!');
        this.invalidate('userName', 'At least one of email or mobile  0r user name  must be provided!');
    }
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;