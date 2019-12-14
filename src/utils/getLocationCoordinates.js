const log = require('./logger');
const { forwardGeocode } = require('../utils/request');

async function getLocationCoordinates(location) {
  let coords;
  if (location === 'London') {
    coords = { latitude: 51.5074, longitude: 0.1278 };
  } else {
    const data = await forwardGeocode(location);
    log.info(data);
    coords = { latitude: data.latt, longitude: data.longt };
    if (data.error) {
      coords.error = data.error;
    }
  }

  return coords;
}

module.exports = getLocationCoordinates;
