const Todo = require('../models/todo.model');

exports.dashboard = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.session.userId, status: { $ne: 'deleted' } });
    res.render('todos', { todos });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    await Todo.create({ title: req.body.title, userId: req.session.userId });
    res.redirect('/todos');
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.redirect('/todos');
  } catch (err) {
    next(err);
  }
};

