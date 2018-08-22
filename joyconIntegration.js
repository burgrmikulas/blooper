const getJoycon = require('./joyconController');
const mapBufferToValue = require('./joyconInputFilter');

(async function() {
  const joycon = await getJoycon();
  joycon.on('data', buff => {
    console.log(mapBufferToValue(buff));
  });
})();
