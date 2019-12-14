const log = require('./logger');
const { forwardGeocode } = require('../utils/request');

async function getLocationCoordinates(location) {
  let coords;
  try {
    if (location === 'London') {
      coords = { latitude: 51.5074, longitude: 0.1278 };
    } else {
      const data = await forwardGeocode(location);
      console.log(data);
      coords = { latitude: data.latt, longitude: data.longt };
    }
  } catch (err) {
    log.error('busted');
  }

  return coords;
}

module.exports = getLocationCoordinates;
