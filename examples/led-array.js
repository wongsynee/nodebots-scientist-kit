var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  let array = new five.Leds([3, 5, 6]);

  array[0].pulse();

  setTimeout(function(){
    array[1].pulse();
  }, 500);

  setTimeout(function(){
    array[2].pulse();
  }, 1000);

});