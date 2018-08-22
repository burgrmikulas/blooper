const five = require('johnny-five');
const keypress = require('keypress');
const board = new five.Board({
  port: '/dev/tty.eel-DevB', // path to bluetooth connection, i.e. /dev/tty.ROBOT_NAME-SPPDev or COMX
    repl: false,
});

board.on('ready', function() {
  console.log('board is ready')
  const led = new five.Led(13); // use built-in led on Arduino


  const left = new five.Led(8);
  // const left = new five.ESC({
  //   pin: 8,
  //   device: "FORWARD_REVERSE",
  //   neutral: 50,
  // });
  // const right = new five.ESC({
  //   pin: 6,
  //   device: "FORWARD_REVERSE",
  //   neutral: 50,
  // });
  // let leftSpeed = left.value;
  // let rightSpeed = right.value;
  // var motor = new five.Motor([11, 12]);
  // // Forward at half speed
  // motor.forward(128);

  // // Stop
  // motor.stop();

  // // Resume forward at half speed
  // motor.start();

  // // Continue forward at full speed
  // motor.start(255);
  console.log('left and right motors initialized, neutral speed is 50');

  function controller(ch, key) {
    console.log(`controller initialized with ${key.name} key: `, key)

    if (key && key.name === 'a') {
      console.log('a key pressed, test blinking behavior should run');
      led.blink();
    }

    if (key && key.name === 's') {
      console.log('s key pressed, left motor should speed up forward. here is the prior speed: ');
      left.on();
      console.log('new speed')
    }

    if (key && key.name === 'd') {
      console.log('d key pressed, left motor should speed up in reverse. here is the prior speed: ');
      left.off();
      console.log('new speed')
    }

    // if (key && key.name === 'k') {
    //   console.log('down key pressed, motor should speed up in reverse. here is the prior speed: ', esc.value);
    //   escSpeed -= 5;
    //   esc.speed(escSpeed);
    //   console.log('new speed', esc.value)
    // }

    // if (key && key.name === 'l') {
    //   console.log('down key pressed, motor should speed up in reverse. here is the prior speed: ', esc.value);
    //   escSpeed -= 5;
    //   esc.speed(escSpeed);
    //   console.log('new speed', esc.value)
    // }

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
