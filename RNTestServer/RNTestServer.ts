// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 1888;
const JSON_FILE = path.join(__dirname, 'booking.json');

const server = http.createServer(async (req, res) => {

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/api/booking' && req.method === 'GET') {
    try {
      const data = await fs.promises.readFile(JSON_FILE, 'utf8');
      res.statusCode = 200;
      res.end(data);
      
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({
        error: 'Failed to load bookings\' data',
        details: error.message
      }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});