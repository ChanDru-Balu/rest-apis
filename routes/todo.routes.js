
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
    if(req.params.id == 3){
        res.status(404).send('Not Found!');
    }
    console.log(req.params.id);
    let todo = {
        id: 1 ,
        title : 'new',
        status : 'pending'
    }
    res.status(200).send(todo)
});

router.get('/search',(req,res)=>{
    console.log(req.query,search);
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