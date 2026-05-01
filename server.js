// server.js
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {// use for preventing from url : /favicon.ico
    res.writeHead(204); // 204 = No Content
    return res.end();
  }

 console.log(req.method,req.url);
  try {
    res.write('Hello, World!');
    console.log("Hello world");
    res.end();
  } catch (err) {
    console.error('Error handling request:', err.message);
    res.end('Something went wrong');
  }
});
server.listen(3000, () => {
 console.log('Server running on http://localhost:3000');
});