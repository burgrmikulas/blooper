const five = require('johnny-five');

const initRudder = (pin = 12, startAt = 90) => {
  const rudder = new five.Servo({
    pin,
    range: [45, 135],
    startAt,
  });
  const angle = startAt;
  console.log(`servo rudder initialized at ${angle} degrees`);
  return {
    rudder,
    angle,
  }
}

const left = (rudder, angle, offset = 20, duration = 200) => {
  angle -= offset;
  rudder.to(angle, duration);
  return angle;
}

const right = (rudder, angle, offset = 20, duration = 200) => {
  angle += offset;
  rudder.to(angle, duration);
  return angle;
}

const center = (rudder, start = 90) => {
  rudder.to(start);
  return start;
}

module.exports = {
  initRudder,
  left,
  right,
  center,
}
