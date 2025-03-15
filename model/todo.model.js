const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task:String,
    status : String,
    date: String
})
const todo = mongoose.model(`todo`, todoSchema);

module.exports = todo
// const todoNew = new todoModel({
//     task: `test`,
//     status: `pending`,
//     date: '16-03-2025'
// });

// todoNew.save().then((res)=>console.log(`Save Successfully:`,res)).catch((error)=>console.error('Failed to save:',error));