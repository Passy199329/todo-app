exports.createTodo = async (req, res, next) => {
  try {
    await Todo.create({ 
      title: req.body.title, 
      user: req.session.user  
    });
    res.redirect('/todos');
  } catch (err) {
    next(err);
  }
};

exports.dashboard = async (req, res, next) => {
  try {
    const todos = await Todo.find({ 
      user: req.session.user,
      status: { $ne: 'deleted' } 
    });
    res.render('todos', { todos });
  } catch (err) {
    next(err);
  }
};



