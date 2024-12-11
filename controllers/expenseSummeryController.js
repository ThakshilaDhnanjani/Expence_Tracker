const db = require('../db_config');

// Get total expenses and category-wise expenses for a month or year
exports.getExpenseSummary = (req, res) => {
  const { limit, offset } = req.query;
  const itemsPerPage = parseInt(limit, 10) || 10; 
  const startIndex = parseInt(offset, 10) || 0;

  if (isNaN(itemsPerPage) || isNaN(startIndex)) {
    return res.status(400).json({ error: 'Limit and offset must be valid numbers.' });
  }

  // Get total expenses and category-wise breakdown for a specific period (Month/Year)
  const sql = `
    SELECT 
      category,
      YEAR(date) AS year,
      MONTH(date) AS month,
      SUM(amount) AS total
    FROM expenses
    GROUP BY category, YEAR(date), MONTH(date)
    ORDER BY year DESC, month DESC, category
    LIMIT ? OFFSET ?;
  `;

  db.query(sql, [itemsPerPage, startIndex], (err, results) => {
    if (err) {
      console.error('Error fetching summary:', err.message);
      return res.status(500).json({ error: 'Failed to fetch expense summary.' });
    }

    const countSql = `
      SELECT COUNT(DISTINCT category, YEAR(date), MONTH(date)) AS total
      FROM expenses;
    `;
    db.query(countSql, (countErr, countResults) => {
      if (countErr) {
        console.error('Error fetching summary count:', countErr.message);
        return res.status(500).json({ error: 'Failed to fetch expense summary count.' });
      }

      const totalItems = countResults[0]?.total || 0;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      res.json({
        data: results,
        pagination: {
          totalItems,
          totalPages,
          currentPage: Math.floor(startIndex / itemsPerPage) + 1,
          itemsPerPage,
        },
      });
    });
  });
};

// Get yearly summary (total per year)
exports.getYearlySummary = (req, res) => {
  const { limit, offset } = req.query;
  const itemsPerPage = parseInt(limit, 10) || 10;
  const startIndex = parseInt(offset, 10) || 0;

  if (isNaN(itemsPerPage) || isNaN(startIndex)) {
    return res.status(400).json({ error: 'Limit and offset must be valid numbers.' });
  }

  const sql = `
    SELECT 
      category,
      YEAR(date) AS year,
      SUM(amount) AS total
    FROM expenses
    GROUP BY category, YEAR(date)
    ORDER BY year DESC, category
    LIMIT ? OFFSET ?;
  `;

  db.query(sql, [itemsPerPage, startIndex], (err, results) => {
    if (err) {
      console.error('Error fetching yearly summary:', err.message);
      return res.status(500).json({ error: 'Failed to fetch yearly summary.' });
    }

    const countSql = `
      SELECT COUNT(DISTINCT category, YEAR(date)) AS total
      FROM expenses;
    `;
    db.query(countSql, (countErr, countResults) => {
      if (countErr) {
        console.error('Error fetching yearly summary count:', countErr.message);
        return res.status(500).json({ error: 'Failed to fetch yearly summary count.' });
      }

      const totalItems = countResults[0]?.total || 0;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      res.json({
        data: results,
        pagination: {
          totalItems,
          totalPages,
          currentPage: Math.floor(startIndex / itemsPerPage) + 1,
          itemsPerPage,
        },
      });
    });
  });
};

// Get category-wise breakdown
exports.getCategoryWiseSummary = (req, res) => {
  const sql = `
    SELECT 
      category,
      SUM(amount) AS total
    FROM expenses
    GROUP BY category
    ORDER BY total DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching category summary:', err.message);
      return res.status(500).json({ error: 'Failed to fetch category summary.' });
    }

    res.json({data:results});
  });
};
/*
// Get detailed expense list with ID, category, date, amount, and description
exports.getDetailedExpenseList = (req, res) => {
  const { limit, offset } = req.query;
  const itemsPerPage = parseInt(limit, 10) || 10;
  const startIndex = parseInt(offset, 10) || 0;

  if (isNaN(itemsPerPage) || isNaN(startIndex)) {
    return res.status(400).json({ error: 'Limit and offset must be valid numbers.' });
  }

  const sql = `
    SELECT 
      id, 
      category, 
      DATE(date) AS date, 
      amount
    FROM expenses
    ORDER BY date DESC
    LIMIT ? OFFSET ?;
  `;

  db.query(sql, [itemsPerPage, startIndex], (err, results) => {
    if (err) {
      console.error('Error fetching expense list:', err.message);
      return res.status(500).json({ error: 'Failed to fetch expense list.' });
    }

    const countSql = `
      SELECT COUNT(*) AS total
      FROM expenses;
    `;
    db.query(countSql, (countErr, countResults) => {
      if (countErr) {
        console.error('Error fetching expense count:', countErr.message);
        return res.status(500).json({ error: 'Failed to fetch expense count.' });
      }

      const totalItems = countResults[0]?.total || 0;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      res.json({
        data: results,
        pagination: {
          totalItems,
          totalPages,
          currentPage: Math.floor(startIndex / itemsPerPage) + 1,
          itemsPerPage,
        },
      });
    });
  });
};*/
/*
// Get growth rate and category trends
exports.getExpenseTrends = (req, res) => {
  const { year, month } = req.query;

  if (!year || isNaN(year)) {
    return res.status(400).json({ error: 'Valid year is required.' });
  }

  // Monthly Growth Rate
  const growthRateSql = `
    SELECT 
      YEAR(date) AS year,
      MONTH(date) AS month,
      SUM(amount) AS total
    FROM expenses
    WHERE YEAR(date) = ?
    GROUP BY YEAR(date), MONTH(date)
    ORDER BY year DESC, month DESC;
  `;

  db.query(growthRateSql, [year], (err, growthResults) => {
    if (err) {
      console.error('Error calculating growth rate:', err.message);
      return res.status(500).json({ error: 'Failed to calculate growth rate.' });
    }

    // Category Trends
    const categoryTrendsSql = `
      SELECT 
        category,
        SUM(amount) AS total
      FROM expenses
      WHERE YEAR(date) = ?
      GROUP BY category
      ORDER BY total DESC;
    `;

    db.query(categoryTrendsSql, [year], (err, trendsResults) => {
      if (err) {
        console.error('Error fetching category trends:', err.message);
        return res.status(500).json({ error: 'Failed to fetch category trends.' });
      }

      res.json({
        growthRate: growthResults,
        categoryTrends: trendsResults,
      });
    });
  });
};

*/
exports.getExpenseTrends = (req, res) => {
  const { year } = req.query;

  if (!year || isNaN(year)) {
    return res.status(400).json({ error: 'Valid year is required.' });
  }

  const trendsSql = `
    SELECT 
      category,
      YEAR(date) AS year,
      MONTH(date) AS month,
      SUM(amount) AS total
    FROM expenses
    WHERE YEAR(date) = ?
    GROUP BY category, YEAR(date), MONTH(date)
    ORDER BY category ASC, year DESC, month DESC;
  `;

  db.query(trendsSql, [year], (err, results) => {
    if (err) {
      console.error('Error fetching expense trends:', err.message);
      return res.status(500).json({ error: 'Failed to fetch expense trends.' });
    }

    // Format the data into the desired structure
    const formattedData = results.reduce((acc, row) => {
      const { category, year, month, total } = row;

      // Find or create the category entry
      let categoryEntry = acc.find((entry) => entry.categoryname === category);
      if (!categoryEntry) {
        categoryEntry = { categoryname: category, data: [] };
        acc.push(categoryEntry);
      }

      // Add the {year, month: total} entry
      categoryEntry.data.push({ year, [month]: total });
      return acc;
    }, []);

    res.json(formattedData);
  });
};
