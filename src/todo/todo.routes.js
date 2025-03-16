
const express = require('express');
const router = express.Router();
const Todo = require('./todo.model');


// Traditional Style
router.get('/', async (req, res) => {
    try {
        let todoList = await Todo.find();
        console.log({ todoList })
        if (todoList.length == 0) {
            return res.status(404).send({ message: "No todo" })
        }
        res.status(200).send(todoList);
    } catch (error) {
        res.status(500).send({ message: "get failed", error: error })
    }
});

router.get('/search', async (req, res) => {
    let searchQuery = req.query.search;
    try {
        let todo =await Todo.find({ task: { $regex: new RegExp(`${searchQuery}`, 'i') } });
        console.log(todo.length , {todo})
        if(todo.length == 0){
            return res.status(404).send({message: 'todo not found for the query!'})
        }
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({ message: 'search failed', error: error });
    }
})


router.get('/:id', async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send({ message: "No todo for the provided ID!" });
        }
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({ message: 'id failed', error: error })
    }
});


router.post('/', (req, res) => {
    let { task, status, date } = req.body;
    const newTodo = new Todo({ task, status, date })
    try {
        const savedTodo = newTodo.save()
        res.status(201).send(savedTodo);
    } catch (error) {
        res.status(500).send({ message: 'post failed', error: error })
    }

});

router.put('/:id', async (req, res) => {
    // let {task,status,body} = req.body ; 

    try {
        let updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).send({ message: "Todo not found" });
        }
        res.status(200).send({ message: 'Todo Updated!', updatedTodo })
    } catch (error) {
        res.status(500).send({ message: 'update failed', error: error })
    }

});

router.delete('/:id', async (req, res) => {
    try {
        let deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).send({ message: 'failed', data: 'Todo not found!' });
        }
        res.status(204).send({ message: 'Todo Deleted' });
    } catch (error) {
        res.status(500).send({ message: 'delete failed', error })
    }
});


module.exports = router;