const http = require('http');
const defaultRepository = require('./repository.js');
const hostname = '127.0.0.1';
const port = '3000';


const serverApp = (repository = defaultRepository) => {

  http.createServer((req, res) => {
    if (req.url === '/messages' && req.method === 'GET' ) {
      res.writeHead(200, {'Content-Type': 'application/json'});

      res.end(JSON.stringify(repository.getMessages()));
    }
    if (req.url === '/message' && req.method === 'POST') {
      res.writeHead(200, {'Content-Type': 'application/json'});

      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const parsedBody = JSON.parse(body);

        const messageBody = parsedBody.message;
        const savedMessage = repository.saveToRepository(messageBody);

        const jsonifiedObject = JSON.stringify(savedMessage);
        res.end(jsonifiedObject);
      });
    }

  }).listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Serving running at http://${hostname}:${port}/`);
  });

};

module.exports = {serverApp};