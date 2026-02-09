const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.model');

// 1. Display all todos
// Maps to: GET /todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.session.user, status: { $ne: 'deleted' } });
    res.render('todos', { todos });
  } catch (err) {
    next(err);
  }
});

// 2. Create a new todo
// Maps to: POST /todos/create
router.post('/create', async (req, res, next) => {
  try {
    if (!req.body.title) return res.redirect('/todos');

    await Todo.create({ 
      title: req.body.title, 
      user: req.session.user 
    });
    res.redirect('/todos');
  } catch (err) {
    next(err);
  }
});

// 3. Update todo status
// Maps to: POST /todos/update/:id
router.post('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending','completed','deleted'].includes(status)) {
      return res.redirect('/todos');
    }

    await Todo.findByIdAndUpdate(id, { status });
    res.redirect('/todos');
  } catch (err) {
    next(err);
  }
});

// THIS NOW WORKS because 'router' is defined at the top
module.exports = router;