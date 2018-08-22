const five = require("johnny-five");
const keypress = require("keypress");

// const board = new five.Board({
//   port: '/dev/tty.eel-DevB', // path to bluetooth connection, i.e. /dev/tty.ROBOT_NAME-SPPDev or COMX
//     repl: false,
// });

function Motor(pin = 11) {

}

const initMotor = (pin = 11) => {
  const esc = new five.ESC({
    pin,
    device: "FORWARD_REVERSE",
    neutral: 50,
  });
  let escSpeed = esc.value;
  console.log('esc initialized, neutral speed is 50');
  return {
    esc,
    escSpeed,
  }
}

const forward = (esc, escSpeed, increment = 1) => {
  console.log('incrementing motor value, i.e. going forward');
  escSpeed += increment;
  esc.speed(escSpeed);
  console.log('new speed', esc.value)
}

const reverse = (esc, escSpeed, decrement = 1) => {
  console.log('incrementing motor value, i.e. going forward');
  escSpeed -= decrement;
  esc.speed(escSpeed);
  console.log('new speed', esc.value)
}

module.exports = {
  initMotor,
  forward,
  reverse,
}



    if (key && key.name === 'a') {
      console.log('a key pressed, test blinking behavior should run');
      led.blink();
    }

    if (key && key.name === 'up') {
      console.log('up key pressed, motor should speed up forward. here is the prior speed: ', esc.value);
      escSpeed += 5;
      esc.speed(escSpeed);
      console.log('new speed', esc.value)
    }

    if (key && key.name === 'down') {
      console.log('down key pressed, motor should speed up in reverse. here is the prior speed: ', esc.value);
      escSpeed -= 5;
      esc.speed(escSpeed);
      console.log('new speed', esc.value)
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
