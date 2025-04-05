
const express = require('express');
const router = express.Router();
const Todo = require('./todo.model');
const verifyToken = require('../utils/verify');


// Traditional Style
router.get('/', verifyToken, async (req, res) => {
    const user = req.user ;
    try {
        let todoList = await Todo.find({user : user._id});
        if (todoList.length == 0) {
            return res.status(204).send({ message: "No todo" });
        }
        res.status(200).send(todoList);
    } catch (error) {
        res.status(500).send({ message: "get failed", error: error });
    }
});

router.get('/search', verifyToken, async (req, res) => {
    const user = req.user ;
    let searchQuery = req.query.search;
    try {
        let todo = await Todo.find({ user: user.id ,task: { $regex: new RegExp(`${searchQuery}`, 'i') } });
        if (todo.length == 0) {
            return res.status(404).send({ message: 'todo not found for the query!' });
        }
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({ message: 'search failed', error: error });
    }
})

router.get('/:id', verifyToken, async (req, res) => {
    const user = req.user ;
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

router.post('/', verifyToken, async (req, res) => {

    let { task, status, date } = req.body;
    const user = req.user;
    const newTodo = new Todo({ task, status, date, user: user._id })

    try {
        const savedTodo = await newTodo.save()
        res.status(201).send(savedTodo);
    } catch (error) {
        res.status(500).send({ message: 'post failed', error: error })
    }

});

router.put('/:id', verifyToken, async (req, res) => {
    // let {task,status,body} = req.body ; 
    const user = req.user ;
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

router.delete('/:id', verifyToken, async (req, res) => {
    const user = req.user ;
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