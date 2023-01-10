const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  console.log(
    `${
      request.url
    } visited at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (request.url === '/') {
    response.writeHead(301, {
      Location: 'https://football-calendar.harka.com',
    });
    response.end();
  } else if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
  } else if (request.url === '/load') {
    const sportData = fs.readFileSync('data.json', 'utf8');
    response.writeHead(200);
    response.end(sportData);
  } else if (request.url === '/save') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      fs.writeFileSync('data.json', body);
      // const jsonData = JSON.parse(body);
      // console.log(jsonData);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'data received' }));
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end(`404: ${request.url} page not found.`);
    console.log(request.url);
  }
});

server.listen(3000, err => {
  if (err) return console.log(err);
});
