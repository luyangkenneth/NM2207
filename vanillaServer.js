var http = require('http');

// Create the server.
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('Hello world!\n');
  res.end();
});

// Start the server listening on a port.
var port = 3000;
server.listen(port);
console.log("server listening on port " + port);
