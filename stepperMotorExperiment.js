const five = require("johnny-five");
const keypress = require("keypress");
const board = new five.Board({
  port: '/dev/tty.eel-DevB', // path to bluetooth connection, i.e. /dev/tty.ROBOT_NAME-SPPDev or COMX
    repl: false,
});

board.on("ready", function() {
  console.log('board is ready')
  const led = new five.Led(13); // use built-in led on Arduino

  const esc = new five.ESC({
    pin: 10,
    device: "FORWARD_REVERSE",
    neutral: 50,
  });
  let escSpeed = esc.value;

  function controller(ch, key) {
    console.log(`controller initialized with ${key.name} key: `, key)

    if (key && key.name === 'a') {
      console.log('a key pressed, test blinking behavior should run');
      led.blink();
    }

    if (key && key.name === 'up') {
      console.log('up key pressed, motor should speed up forward', esc.value);
      escSpeed += 5;
      esc.speed(escSpeed);
      console.log('new speed', esc.value)
    }

    if (key && key.name === 'down') {
      console.log('down key pressed');
      escSpeed -= 5;
      esc.speed(escSpeed);
    }

    if (key && key.name === 'c') {
      console.log('c key pressed');
      process.exit();
    }
  }

  keypress(process.stdin);

  process.stdin.on("keypress", controller);
  process.stdin.setRawMode(true);
  process.stdin.resume();
});
