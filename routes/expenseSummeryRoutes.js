const express = require('express');
const router = express.Router();
const expenseSummeryController = require('../controllers/expenseSummeryController');

// Routes for expense-related features
router.get('/summary', expenseSummeryController.getExpenseSummary);
router.get('/yearly-summary', expenseSummeryController.getYearlySummary);
router.get('/category-wise', expenseSummeryController.getCategoryWiseSummary);
/*router.get('/detailed-list', expenseSummeryController.getExpenseTrends);*/
router.get('/trends', expenseSummeryController.getExpenseTrends);

module.exports = router;
