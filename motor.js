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

const forward = (motor, speed, increment = 4) => {
  console.log('power boost speed', increment)
  speed += increment;
  //speed = five.Fn.constrain(speed + increment, MIN_SPEED, MAX_SPEED);
  console.log('max speed is', 100)
  speed = Math.min(speed, 100);
  console.log('speed after mathmin', speed)
  motor.speed(speed);
  return speed;
}

const reverse = (motor, speed, decrement = 4) => {
  //speed = five.Fn.constrain(speed - decrement, MIN_SPEED, MAX_SPEED);
  speed -= decrement;
  speed = Math.max(speed, 0);
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
