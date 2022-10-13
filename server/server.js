// Environment variables
require('dotenv').config()

// Express server
const express = require('express');
const app = express();

// Middleware for json from client
app.use(express.json());

// Routes
const usersRouter = require('./routes/users.route.js');
app.use('/api/users', usersRouter);

// Server listening
app.listen(process.env.NODE_PORT, () => {
	console.log("Listening on port 3000 ...")
})