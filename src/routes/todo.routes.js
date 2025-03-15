
const express = require('express');
const router = express.Router();
const Todo = require('../../model/todo.model');


// Traditional Style
router.get('/',(req,res)=>{
    res.send('todoList')
});

router.get('/:id',(req,res)=>{
    res.status(200).send('todo')
});

router.get('/search',(req,res)=>{
    res.send('todo')
})

router.post('/',(req,res)=>{
    console.log("todo Body:",req.body);
    let {task,status,date} = req.body;

    const newTodo = new Todo({task,status,date})
    const saveTodo = newTodo.save()
    console.log({saveTodo})
    res.send('Todo Added!');
});

router.put('/:id',(req,res)=>{
    res.send('Todo Updated!')
});

router.delete('/:id',(req,res)=>{
    res.send('Todo deleted!')
});


module.exports = router;