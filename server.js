// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Set the port for the server to listen on
const port = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Serve static files (e.g., HTML, CSS, JavaScript)
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Handle other routes or API endpoints here
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
