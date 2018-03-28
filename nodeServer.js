var express = require('express');

// Use current folder as the "root" directory for all requests.
// If no path is given, it will look for index.html in that directory.
var server = express();
server.use(express.static('./'));

// Start the server listening on a port.
var port = parseInt(process.argv[2]);
server.listen(port);
console.log("server listening on port " + port);
