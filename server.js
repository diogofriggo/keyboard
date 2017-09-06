var app = require('http').createServer(handler);
var path = require('path');
var url = require('url');
var fs = require('fs');
var io = require('socket.io').listen(app);

var mimes = {
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.css': 'text/css',
  '.ogg': 'audio/ogg'
};

function handler(request, response){
  var filePath = url.parse(decodeURI(request.url)).pathname.slice(1) || 'index.html';
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

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.on('keypressed', function(data){
    socket.broadcast.emit('keypressed_broadcasted', data);
  });
});
