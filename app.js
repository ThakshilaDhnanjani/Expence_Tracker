const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
const expensesSummary = require('./routes/expenseSummeryRoutes');
const signupRouter = require('./routes/signupRoutes');
const signinRouter = require('./routes/signinRoutes');
require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/expensesSummary', expensesSummary); 

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));