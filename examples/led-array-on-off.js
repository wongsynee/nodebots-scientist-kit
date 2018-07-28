var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    let array = new five.Leds([3, 5, 6]);

    var i;
    for (i = 0; i < array.length; i++) {
        array.off();
        // if (array[i].on() !== true) {
            setTimeout(function() {
                array[i].on();
            }, 500);
        // }
    }
    

});