const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// Basic middleware
app.use(express.json());

// Handle all routes by serving the HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
});