const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db_config'); // Database configuration
require('dotenv').config();

// Sign up controller function
exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if the username or email already exists
    const checkUserSql = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkUserSql, [username, email], async (err, results) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Database error.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Username or email already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      const insertUserSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertUserSql, [username, email, hashedPassword], (err) => {
        if (err) {
          console.error('Error inserting user:', err.message);
          return res.status(500).json({ error: 'Failed to sign up.' });
        }

        // Create JWT token for the user
        const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ message: 'User registered successfully!', token });
      });
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ error: 'Server error.' });
  }
};
