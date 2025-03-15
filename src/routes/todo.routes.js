
const express = require('express');
const router = express.Router();

const todoList = [
    {
        id: 1,
        title: 'first todo'
    },{
        id: 2,
        title: 'second todo'
    },{
        id:3,
        title: 'third todo'
    }
]

// Traditional Style
// router.get('/',(req,res)=>{
//     res.send('todoList')
// });
// router.get('/:id',(req,res)=>{
//     res.status(200).send('todo')
// });
// router.get('/search',(req,res)=>{
//     res.send('todo')
// })
// router.post('/',(req,res)=>{
//     res.send('Todo Added!');
// });
// router.put('/:id',(req,res)=>{
//     res.send('Todo Updated!')
// });
// router.delete('/:id',(req,res)=>{
//     res.send('Todo deleted!')
// });

router.get('/',(req,res)=>{
    res.status(200).send(todoList)
}).get('/:id',(req,res)=>{
    const todo = todoList.find((todo)=>(todo.id == req.params.id));
    if(!todo){
        res.status(404).send('No todo found')
    }
    res.status(200).send(todo)
}).get('/searchTodo/search',(req,res)=>{
    const todo = todoList.find((todo)=>(todo.title == req.query.title));
    if(!todo){
        res.status(404).send('No todo found')
    }
    res.status(200).send(todo)
}).post('/',(req,res)=>{
    res.status(201).send('Todo created')
}).put('/:id',(req,res)=>{
    res.status(200).send('Todo updated')
}).delete('/:id',(req,res)=>{
    res.status(200).send('Todo deleted!')
})

module.exports = router;