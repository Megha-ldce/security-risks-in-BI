// Import required modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Create an instance of Express
const app = express();

// Middleware for logging requests
app.use(morgan('dev'));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API endpoint' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
