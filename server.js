var express = require('express');
var path = require('path');


const PORT = 7001;

var server = express();

server.use('/', express.static(path.join(__dirname, 'public')));

// send all requests to index.html so browserHistory in React Router works
server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public','index.html'))
})

server.listen(PORT, function() { console.log(`listening on ${PORT}`)});
