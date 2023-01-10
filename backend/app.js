const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  console.log(request.url);

  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (request.url === '/') {
    response.writeHead(301, {
      Location: 'https://football-calendar.harka.com',
    });
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end(`404: ${request.url} page not found.`);
    console.log(request.url);
  }
});

server.listen(3000, err => {
  if (err) return console.log(err);
});
