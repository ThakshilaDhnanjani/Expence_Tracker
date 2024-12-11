const db = require('../db_config');

// Helper function to validate and format date (YYYY-MM-DD)
const formatDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }
  return date; // Return the date as is
};

// Get all expenses
exports.getExpenses = (req, res) => {
  const sql = `
    SELECT *, CONVERT_TZ(\`date\`, "+00:00", "+05:30") AS date 
    FROM expenses
    ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err.message);
      return res.status(500).json({ error: 'Failed to fetch expenses.' });
    }

    res.json({
      data: results
    });
  });
};

// Add an expense
exports.addExpense = (req, res) => {
  const { category, date, amount, description } = req.body;

  if (!category || !amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Category and a valid amount are required.' });
  }
  if (!date) {
    return res.status(400).json({ error: 'Date is required in YYYY-MM-DD format.' });
  }

  try {
    const expenseDate = formatDate(date);
    const sql = 'INSERT INTO expenses (category, date, amount, description) VALUES (?, ?, ?, ?)';
    db.query(sql, [category, expenseDate, amount, description || null], (err) => {
      if (err) {
        console.error('Error adding expense:', err.message);
        return res.status(500).json({ error: 'Failed to add expense.' });
      }
      res.status(201).json({ message: 'Expense added successfully.' });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an expense
exports.deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'A valid expense ID is required.' });
  }

  const sql = 'DELETE FROM expenses WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting expense:', err.message);
      return res.status(500).json({ error: 'Failed to delete expense.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }
    res.json({ message: 'Expense deleted successfully.' });
  });
};

// Update an expense
exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { category, date, amount, description } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'A valid expense ID is required.' });
  }
  if (!category || !amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Category and a valid amount are required.' });
  }

  const expenseDate = date ? formatDate(date) : formatDate(new Date());
  const sql = 'UPDATE expenses SET category = ?, date = ?, amount = ?, description = ? WHERE id = ?';
  db.query(sql, [category, expenseDate, amount, description || null, id], (err, results) => {
    if (err) {
      console.error('Error updating expense:', err.message);
      return res.status(500).json({ error: 'Failed to update expense.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }
    res.json({ message: 'Expense updated successfully.' });
  });
};
/*
exports.updateExpense=(req, res) => {
  const expenseID = req.params.id;
  const { category, description, date, amount } = req.body;

  // SQL query to update the expense
  const sql = `
    UPDATE expenses
    SET category = ?, description = ?, date = ?, amount = ?
    WHERE id = ?`;

  db.query(sql, [category, description, date, amount, expenseID], (err, result) => {
    if (err) {
      console.error('Error updating expense:', err.message);
      return res.status(500).json({ error: 'Failed to update expense.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    // Return success response
    res.status(200).json({ message: 'Expense updated successfully.' });
  });
};


*/





// Get an expense by ID
exports.getExpenseById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'A valid expense ID is required.' });
  }

  // SQL query to fetch the expense by ID
  const sql = `
    SELECT *, CONVERT_TZ(\`date\`, "+00:00", "+05:30") AS date
    FROM expenses
    WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching expense:', err.message);
      return res.status(500).json({ error: 'Failed to fetch expense.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    res.json({ data: results[0] }); // Return the first (and only) result
  });
};
