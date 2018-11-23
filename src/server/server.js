const http = require('http');
const hostname = '127.0.0.1';
const port = '3000';


const server = (repository = {}) => {
  {
    http.createServer((req, res) => {
      if (req.url === '/messages' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(repository));
      }
    }).listen(port, hostname, () => {
      // eslint-disable-next-line no-console
      console.log(`Serving running at http://${hostname}:${port}/`);
    });
  }
};



module.exports = server;