const express = require('express');
const path = require('path');
const app = express();
const PORT = 3040;

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// For all other routes, return the index.html file
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});