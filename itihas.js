// itihas.js: Static server using serve-handler for exact 'serve' behavior
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 2008; // Using port 2008 as per memory
const BUILD_DIR = path.join(__dirname, 'build');

// Serve static files from the build directory
app.use(express.static(BUILD_DIR));

// Serve index.html for any requests that don't match static files
app.use((req, res, next) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`itihas.js server running at http://localhost:${PORT}`);
  console.log(`Serving build directory: ${BUILD_DIR}`);
});
