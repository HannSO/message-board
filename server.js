const http = require('http');

const hostname = '127.0.0.1';
const port = '3000';


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Response content');
});

server.listen(port,hostname,() => {
  // eslint-disable-next-line no-console
  console.log(`Serving running at http://${hostname}:${port}/`);
});