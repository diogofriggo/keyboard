var socket = io.connect('http://localhost');

socket.on('keypressed_broadcasted', function(data){
  console.log('keypressed_broadcasted: ' + data);
});

$(document).keypress(function(event){
  console.log('keypressed: ' + event.which);
  socket.emit('keypressed', event.which);
});