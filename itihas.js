const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const BUILD_DIR = path.join(__dirname, 'build');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something broke!');
});

// Serve static files from the build directory
app.use(express.static(BUILD_DIR));

// Handle all routes
app.use((req, res) => {
  try {
    let requestPath = req.path;
    console.log(`Handling request for: ${requestPath}`);

    // Handle root path
    if (requestPath === '/') {
      return res.sendFile(path.join(BUILD_DIR, 'index.html'));
    }

    // Remove trailing slash if present
    requestPath = requestPath.replace(/\/$/, '');

    // Try different file paths in order
    const possiblePaths = [
      path.join(BUILD_DIR, requestPath + '.html'),              // /path.html
      path.join(BUILD_DIR, requestPath, 'index.html'),         // /path/index.html
      path.join(BUILD_DIR, requestPath.substring(1) + '.html') // path.html (without leading slash)
    ];

    // Try each possible path
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        console.log(`Serving file: ${filePath}`);
        return res.sendFile(filePath);
      }
    }

    // If no matching file found, serve index.html for client-side routing
    console.log('No matching file found, serving index.html');
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
  } catch (error) {
    console.error('Error handling request:', error);
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
  }
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Keeping server running...');
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Keeping server running...');
});

// Prevent uncaught exceptions from crashing the server
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Serving from: ${BUILD_DIR}`);
});

// Keep the server running
server.on('error', (error) => {
  console.error('Server error:', error);
});

