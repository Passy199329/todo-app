const express = require('express');
const router = express.Router();
const todo = require('../controllers/todo.controller'); // must exist
const authMiddleware = require('../middleware/auth.middleware');

// Apply auth to all routes
router.use(authMiddleware);

router.get('/', todo.dashboard);       // Display dashboard
router.post('/', todo.createTodo);     // Add new todo
router.post('/:id', todo.updateStatus); // Update status or delete

module.exports = router;


