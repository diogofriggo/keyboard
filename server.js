var path = require('path');
var fs = require('fs');
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);

var mimes = {
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.css': 'text/css'
};

function handler(request, response){
  var filePath = path.basename(decodeURI(request.url));
  fs.exists(filePath, function(exists){
    if(exists){
      fs.readFile(filePath, function(error, data){
        response.writeHead(200, { 'Content-Type': mimes[path.extname(filePath)] });
	response.end(data);
      });
    }
    else{
      response.writeHead(404);
      response.end('File not found');
    }
  });
};

app.listen(3000);

io.sockets.on('connection', function (socket) {
  socket.on('keypressed', function(data){
    socket.broadcast.emit('keypressed_broadcasted', data);
  });
});