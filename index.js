const five = require('johnny-five');
const { initMotor, forward, reverse, brake } = require('./motor');
const { initRudder, left, right, center } = require('./rudder');
const getJoycon = require('./joyconController');
const mapBufferToValue = require('./joyconInputFilter');

const MOTOR_PORT = 11;
const RUDDER_PORT = 12;
const LED_PORT = 13;

const NEUTRAL_SPEED = 50;
const MAX_SPEED = 100;
const MIN_SPEED = 0;
const FAST_INCREMENT = 10;
const SLOW_INCREMENT = 5;

const NEUTRAL_ANGLE = 90;
const ANGLE_OFFSET = 20;
const ANGLE_OFFSET_DURATION = 200;


const board = new five.Board({
  port: '/dev/tty.eel-DevB', // path to bluetooth connection, i.e. /dev/tty.ROBOT_NAME-SPPDev or COMX
  repl: false,
});

const testBoard = () => {
  const led = new five.Led(LED_PORT); // use built-in led on Arduino
  led.blink();
}

board.on('ready', async function() {
  console.log('board is ready')
  // to test the thing is on
  testBoard();

  let { motor, speed } = initMotor(MOTOR_PORT, NEUTRAL_SPEED);
  let { rudder, angle } = initRudder(RUDDER_PORT, NEUTRAL_ANGLE);

  const joycon = await getJoycon();

  joycon.on('data', buff => {
    const buffVal = mapBufferToValue(buff);
    console.log('joycon direction: ', buffVal)

    switch (buffVal) {
      case 'N':
        speed = forward(motor, speed, FAST_INCREMENT);
        break;
      case 'S':
        speed = reverse(motor, speed, FAST_INCREMENT);
        break;
      case 'E':
        angle = left(rudder, angle, ANGLE_OFFSET, ANGLE_OFFSET_DURATION);
        break;
      case 'W':
        angle = right(rudder, angle, ANGLE_OFFSET, ANGLE_OFFSET_DURATION);
        break;
      case 'NE':
        speed = forward(motor, speed, SLOW_INCREMENT);
        angle = left(rudder, angle, ANGLE_OFFSET, ANGLE_OFFSET_DURATION);
        break;
      case 'NW':
        speed = forward(motor, speed, SLOW_INCREMENT);
        angle = right(rudder, angle, ANGLE_OFFSET, ANGLE_OFFSET_DURATION);
        break;
      case 'SE':
        speed = reverse(motor, speed, SLOW_INCREMENT);
        angle = left(rudder, angle, ANGLE_OFFSET, ANGLE_OFFSET_DURATION);
        break;
      case 'SW':
        speed = reverse(motor, speed, SLOW_INCREMENT);
        angle = right(rudder, angle, ANGLE_OFFSET, ANGLE_OFFSET_DURATION);
        break;
      case 'OFF':
        speed = brake(motor, NEUTRAL_SPEED);
        angle = center(rudder, NEUTRAL_ANGLE);
        break;
      default:
        break;
    }
    console.log(`current angle: ${angle}`);
    console.log(`current speed: ${speed}`);
  });
});
