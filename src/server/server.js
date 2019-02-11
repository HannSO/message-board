/* eslint-disable no-console */
const http = require('http');
const hostname = '127.0.0.1';
const port = '3000';
const fs = require('fs');
const defaultRepository = require('./repository');

const PROJECT_PATH = process.cwd();
const BUNDLE_PATH = PROJECT_PATH + '/src/server/bundle/bundle.js';
const INDEX_PATH = PROJECT_PATH + '/src/server/index.html';

const serverApp = (repository = defaultRepository) => {
  createServer(repository);
};

const createServer = (repository) => {
  http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {

      fs.readFile(INDEX_PATH, (err, html) => {
        if (err) {
          console.log('error getting html, will not start server: ' + err.message);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
      });
    }

    if (req.url === '/messages' && req.method === 'GET') {
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

    if (req.url === '/bundle' && req.method === 'GET') {

      fs.readFile(BUNDLE_PATH, (err, bundle) => {
        if (err) {
          console.log('error getting bundle, will not start server: ' + err.message);
        }
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end(bundle);
      });
    }

  }).listen(port, hostname, () => {
    console.log(`Serving running at http://${hostname}:${port}/`);
  });
};

module.exports = {serverApp, createServer};