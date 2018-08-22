const five = require('johnny-five');

const initMotor = (pin = 11, neutral = 50) => {
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

const forward = (motor, speed, increment = 1) => {
  speed += increment;
  motor.speed(speed);
  return speed;
}

const reverse = (motor, speed, decrement = 1) => {
  speed -= decrement;
  motor.speed(speed);
  return speed;
}

const brake = (motor, neutral = 50) => {
  motor.brake();
  return neutral;
}

module.exports = {
  initMotor,
  forward,
  reverse,
  brake,
}
