const hid = require('node-hid');

let joycon;

async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async function getJoycon() {
  if (joycon) {
    console.log('cached joycon connected');
    return joycon;
  }

  // get the left joycon
  const definition = hid.devices()
    .find(d => d.product.indexOf('Joy-Con (L)') >= 0);

  if (!definition) {
    console.warn('HID.devices() did not have a "Joy-Con (L)""');
    console.warn('waiting 3 seconds and retrying');
    await wait(3000);
    return await getJoycon();
  }

  try {
    joycon = new hid.HID(definition.vendorId, definition.productId);
  } catch (err) {
    console.warn('new HID was not constructable for Joy-Con (L)');
    console.warn('error: ', err);
    console.warn('waiting 3 seconds and retrying');
    await wait(3000);
    return await getJoycon();
  }

  console.log('joycon connected!');
  joycon.on('error', () => joycon = null);

  return joycon;
};
