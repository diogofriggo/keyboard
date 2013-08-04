//var socket = io.connect('http://localhost');
var socket = io.connect('http://node-keyboard.herokuapp.com');

function animateKey(note){
    var $key = $('div#keyboard>div>div[data-note=' + note + ']');
    $key.toggleClass("active");
    setTimeout(function () { $key.toggleClass("active"); }, 300);
}

function playSound(note){
  var audio = $('audio[src*=' + note + ']')[0];
  audio.load();
  audio.play();
}

socket.on('keypressed_broadcasted', function(note){
  playSound(note);
  animateKey(note);
});

var keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'cedilla', 'tilde_accent', 'close_bracket', 'enter' ];
var notes = [ 'Db1', 'Eb1', 'Gb1', 'Ab1', 'Bb1', 'Db2', 'Eb2', 'Gb2', 'Ab2', 'Bb2', 'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2' ];
var map = {};
$.each(keys, function (index, key) {
  if(key === 'capslock') key = 20;
  else if(key === 'cedilla') key = 186;
  else if(key === 'tilde_accent') key = 222;
  else if(key === 'close_bracket') key = 220;
  else if(key === 'enter') key = 13;
  else { key = key.toUpperCase().charCodeAt(); }
  map[key] = notes[index];
}); 

$(function(){
  $('div#keyboard>div>div').click(function(){
    var note = $(this).data('note');
    playSound(note);
    socket.emit('keypressed', note);
  });

  $(document).keydown(function(event){
    console.log(event.which);
    var note = map[event.which];
    if(note){
      playSound(note);
      animateKey(note);
      socket.emit('keypressed', note);
    }
  });

  $('div#keyboard>div>div').on({ 
    'touchstart' : function(){ } 
  });
});