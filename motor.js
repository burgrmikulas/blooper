const five = require('johnny-five');
const { MOTOR_PORT, NEUTRAL_SPEED, MIN_SPEED, MAX_SPEED, SLOW_INCREMENT } = require('./index');

const initMotor = (pin = MOTOR_PORT, neutral = NEUTRAL_SPEED) => {
  const motor = new five.ESC({
    pin,
    device: 'FORWARD_REVERSE',
    neutral,
  });
  const speed = motor.value;
  console.log(`esc motor initialized at neutral speed of ${speed}`);
  return {
    motor,
    speed,
  }
}

const forward = (motor, speed, increment = SLOW_INCREMENT) => {
  speed += increment;
  //speed = five.Fn.constrain(speed + increment, MIN_SPEED, MAX_SPEED);
  speed = Math.min(speed, MAX_SPEED);
  motor.speed(speed);
  return speed;
}

const reverse = (motor, speed, decrement = SLOW_INCREMENT) => {
  //speed = five.Fn.constrain(speed - decrement, MIN_SPEED, MAX_SPEED);
  speed -= decrement;
  speed = Math.max(speed, MIN_SPEED);
  motor.speed(speed);
  return speed;
}

const brake = (motor, neutral = NEUTRAL_SPEED) => {
  motor.brake();
  return neutral;
}

module.exports = {
  initMotor,
  forward,
  reverse,
  brake,
}
