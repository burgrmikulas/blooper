const five = require('johnny-five');
const keypress = require('keypress');
const board = new five.Board({
  port: '/dev/tty.eel-DevB', // path to bluetooth connection, i.e. /dev/tty.ROBOT_NAME-SPPDev or COMX
    repl: false,
});

board.on('ready', function() {
  console.log('board is ready')
  const led = new five.Led(13); // use built-in led on Arduino

  const servo = new five.Servo({
    pin: 8,
    range: [45, 135],
    startAt: 90
  });
  console.log('rudder initialized at 90 degrees');

  let angle = 90;

  function controller(ch, key) {
    console.log(`controller initialized with ${key.name} key: `, key)

    if (key && key.name === 'a') {
      console.log('a key pressed, test blinking behavior should run');
      led.blink();
    }

    if (key && key.name === 'b') {
      console.log('b key pressed, servo test (sweep) behavior should run. old angle:', angle);
      servo.sweep();
    }

    if (key && key.name === 'left') {
      console.log('left key pressed, rudder should move left: ', angle);
      angle -= 10
      servo.to(angle, 200);
      console.log('new angle', angle)
    }

    if (key && key.name === 'right') {
      console.log('right key pressed, rudder should move right: ', angle);
      angle += 10
      servo.to(angle, 200);
      console.log('new angle', angle)
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
