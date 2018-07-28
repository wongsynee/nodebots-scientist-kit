var five = require("johnny-five"),
    board, lcd;
board = new five.Board();

board.on("ready", function() {
    let piezo = new five.Piezo(3);
    lcd = new five.LCD({
        // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
        // Arduino pin # 7    8   9   10  11  12
        pins: [7, 8, 9, 10, 11, 12],
        backlight: 6,
        rows: 2,
        cols: 16

        // Options:
        // bitMode: 4 or 8, defaults to 4
        // lines: number of lines, defaults to 2
        // dots: matrix dimensions, defaults to "5x8"
    });

    // Tell the LCD you will use these characters:
    lcd.useChar("heart");
    lcd.useChar("runninga");
    lcd.useChar("runningb");
    lcd.useChar("pointerright");

    let heart = ":heart:";
    let runningMan = ":runninga:";
    let eatingArrow = ":pointerright:";

    // Loop through the first row and have the eating arrow follow the man
    (async function runningAway() {
        for (let i = 0; i < 16; i++) {
            if (runningMan === ":runningb:") {
                runningMan = ":runninga:";
            } else {
                runningMan = ":runningb:"
            }
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
            lcd.clear().cursor(0, i).noBlink().print(runningMan).cursor(0, i - 2).noBlink().print(eatingArrow);
        }
        getsEaten();
    })();

    // After running around the man gets eaten by the arrow and then we display a message
    function getsEaten() {
        lcd.clear().cursor(0, 14).noBlink().print(eatingArrow + ":runningb:");
        setTimeout(function() {
            lcd.clear().cursor(0, 15).noBlink().print(eatingArrow);
        }, 400);
        setTimeout(function() {
            lcd.clear().cursor(0, 7).noBlink().print(":runninga:" + heart).cursor(1, 0).noBlink().print("Bye Running Man!");
        }, 800);
        setTimeout(function() {
            lcd.off();
            piezo.off();
        }, 3000);
    }

    // Piezo sound effect
    piezo.play({
        song: [
          [ 1047, 4 ],
          [ 698, 4 ],
          [ 1047, 4 ],
          [ 698, 4 ],
          [ 1047, 3 ],
          [ 698, 3 ],
          [ 1047, 3 ],
          [ 698, 3 ],
          [ 1047, 2 ],
          [ 698, 2 ],
          [ 1047, 2 ],
          [ 698, 2 ]
        ]
    });

    this.repl.inject({
        lcd: lcd
    });
});
