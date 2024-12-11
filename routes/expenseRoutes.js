const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Routes
router.get('/get', expenseController.getExpenses);
router.post('/add', expenseController.addExpense);
router.delete('/delete/:id', expenseController.deleteExpense);
router.put('/update/:id', expenseController.updateExpense);
router.get('/get/:id', expenseController.getExpenseById);

module.exports = router;
