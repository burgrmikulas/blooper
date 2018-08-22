const five = require('johnny-five');

const board = new five.Board({
  port: '/dev/tty.eel-DevB', // path to bluetooth connection, i.e. /dev/tty.ROBOT_NAME-SPPDev or COMX
});

board.on('ready', function() {
  const led = new five.Led(13); // use built-in led on Arduino
  led.blink();
  this.repl.inject({
    led: led
  });
});
