const fs = require('fs'),
  http = require('http'),
  users = require('./users');

const server = http.createServer((request, response) => {
  console.log(
    `${
      request.url
    } visited at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );

  response.setHeader(
    'Access-Control-Allow-Origin',
    'https://football-calendar.harka.com'
  );
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (request.url === '/load') {
    const data = fs.readFileSync('data.json', 'utf8');
    response.writeHead(200);
    response.end(data);
  } else if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
  } else if (request.url === '/save') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      fs.writeFileSync('data.json', body);
      // const jsonData = JSON.parse(body);
      // console.log(jsonData);
      response.writeHead(200);
      response.end();
    });
  } else if (request.url === '/login') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      const loginData = JSON.parse(body);
      console.log(loginData);

      if (users.checkCredentials(loginData.username, loginData.password)) {
        response.writeHead(200);
        console.log('Correct login details.');
      } else {
        response.writeHead(401);
        console.log('Wrong login details.');
      }
      response.end();
    });
  } else if (request.url === '/reset') {
    response.writeHead(200);
    const sportData = fs.readFileSync('sportData.json', 'utf8');
    response.end(sportData);
    fs.writeFileSync('data.json', fs.readFileSync('sportData.json', 'utf8'));
  } else {
    response.writeHead(301, {
      Location: `https://football-calendar.harka.com${request.url}`,
    });
    response.end();
  }
});

server.listen(3000, err => {
  if (err) return console.log(err);
});
