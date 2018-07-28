var five = require("johnny-five");
var board = new five.Board();

// Blinking of LED
board.on("ready", function() {

  // Create a standard `led` component instance
  var led = new five.Led(13);

  // "blink" the led in 500ms on-off phase periods
  led.blink(200);
});

// Fading of LED http://johnny-five.io/examples/led-fade/
// board.on("ready", function() {
//   var led = new five.Led(11);

//   led.fadeIn();

//   // Toggle the led after 5 seconds (shown in ms)
//   this.wait(5000, function() {
//     led.fadeOut();
//   });
// });