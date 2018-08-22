const five = require('johnny-five');
const { RUDDER_PORT, NEUTRAL_ANGLE, ANGLE_OFFSET, ANGLE_OFFSET_DURATION } = require('./index');

const initRudder = (pin = RUDDER_PORT, startAt = NEUTRAL_ANGLE) => {
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

const left = (rudder, angle, offset = ANGLE_OFFSET, duration = ANGLE_OFFSET_DURATION) => {
  angle -= offset;
  rudder.to(angle, duration);
  return angle;
}

const right = (rudder, angle, offset = ANGLE_OFFSET, duration = ANGLE_OFFSET_DURATION) => {
  angle += offset;
  rudder.to(angle, duration);
  return angle;
}

const center = (rudder, start = NEUTRAL_ANGLE) => {
  rudder.to(start);
  return start;
}

module.exports = {
  initRudder,
  left,
  right,
  center,
}
