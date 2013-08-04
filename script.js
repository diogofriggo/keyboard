var socket = io.connect('http://node-keyboard.herokuapp.com');
//var socket = io.connect('http://localhost');

function animateKey(note){
    var $key = $('div#keyboard>div>div[data-note=' + note + ']');
    $key.toggleClass("active");
    $('audio[src*=' + note + ']')[0].play();
    setTimeout(function () { $key.toggleClass("active"); }, 300);
}

socket.on('keypressed_broadcasted', function(note){
  animateKey(note);  
});

var keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'cedilla', 'tilde_accent', 'close_bracket', 'enter' ];
var notes = [ 'Db1', 'Eb1', 'Gb1', 'Ab1', 'Bb1', 'Db2', 'Eb2', 'Gb2', 'Ab2', 'Bb2', 'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2' ];
var map = {};
$.each(keys, function (index, key) {
  if(key === 'capslock') key = 20;
  else if(key === 'cedilla') key = 231;
  else if(key === 'tilde_accent') key = 222;
  else if(key === 'close_bracket') key = 220;
  else if(key === 'enter') key = 13;
  else { key = key.toUpperCase().charCodeAt(); }
  map[key] = notes[index];
}); 

$(function(){
  $('div#keyboard>div>div').click(function(){
    $('audio[src*=' + $(this).data('note') +']')[0].play();
    socket.emit('keypressed', $(this).data('note'));
  });
  $(document).keydown(function(event){
    var note = map[event.which];
    if(note){
      animateKey(note);
      socket.emit('keypressed', note);
    }
  });
  $('div#keyboard>div>div').on({ 'touchstart' : function(){ 
    alert('on touchstart');
    alert($(this));
  } });
  $('div#keyboard>div>div').touchstart(function(event){ 
    alert('touchstart');
    alert(event);
  });
  //$(document).keyup(function(){ $key.toggleClass("active"); });
});