const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task:String,
    status : String,
    date: String
})
const todo = mongoose.model(`todo`, todoSchema);

module.exports = todo
