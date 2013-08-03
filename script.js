var socket = io.connect('http://node-keyboard.herokuapp.com');

socket.on('keypressed_broadcasted', function(data){
  console.log('keypressed_broadcasted: ' + data);
  $('body').append('<br/><span>User typed ' + event.which + '</span>');
});

$(document).keypress(function(event){
  console.log('keypressed: ' + event.which);
  socket.emit('keypressed', event.which);
});