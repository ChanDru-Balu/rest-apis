
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    let todoList = [{
        id: 1 ,
        title : 'new',
        status : 'pending'
    },{
        id: 2,
        title: 'second',
        status : 'completed'
    }]
    res.send(todoList)
});

router.get('/:id',(req,res)=>{
    console.log(req.body);
    let todo = {
        id: 1 ,
        title : 'new',
        status : 'pending'
    }
    res.send(todo)
})

router.post('/',(req,res)=>{
    console.log(req.body);
    res.send('Todo Added!');
});

router.put('/:id',(req,res)=>{
    console.log(req.body);
    res.send('Todo Updated!')
});

router.delete('/:id',(req,res)=>{
    res.send('Todo deleted!')
});

module.exports = router;