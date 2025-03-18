const express = require('express');

const mongoose = require('mongoose');
const { validate } = require('../todo/todo.model');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true ,
        unique: true ,
        validate: (value)=>{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message : props => `${props.value} is not a valid email address!`
    } ,
    password: {
        type: String,
        require: true
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;