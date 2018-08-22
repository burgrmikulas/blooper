const DIRECTIONS = {
  N: 'N',
  NW: 'NW',
  W: 'W',
  SW: 'SW',
  S: 'S',
  SE: 'SE',
  E: 'E',
  NE: 'NE',
  OFF: 'OFF'
}

module.exports = function onJoyconData(buff) {
  if (buff[2] === 0x00 || buff[2] === 0x04) {
    switch (buff[3]) {
      case 0x00: return DIRECTIONS.E;
      case 0x01: return DIRECTIONS.SE;
      case 0x02: return DIRECTIONS.S;
      case 0x03: return DIRECTIONS.SW;
      case 0x04: return DIRECTIONS.W;
      case 0x05: return DIRECTIONS.NW;
      case 0x06: return DIRECTIONS.N;
      case 0x07: return DIRECTIONS.NE;
      case 0x08: return DIRECTIONS.OFF;
    }
  }
}

module.exports.DIRECTIONS = DIRECTIONS;
