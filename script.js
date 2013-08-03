var socket = io.connect('http://localhost');

$(document).keypress(function(event){
  console.log(event.which);
  socket.emit('keypressed', 'key: ' + event.which);
});