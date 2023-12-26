// server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

// Basic route for the home page
app.get('/', (req, res) => {
  res.send('Hello World! This is the home page.');
});

const userRoutes = require('./routes/users'); // Adjust the path as necessary
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
