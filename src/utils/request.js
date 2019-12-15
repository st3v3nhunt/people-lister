const rp = require('request-promise-native');

const log = require('./logger');

const { geocode, server } = require('../config').api;

function request(uri) {
  const options = {
    json: true,
    uri,
  };
  return rp(options);
}

async function getAllUsers() {
  log.info('Getting all users');
  const result = await request(`${server}/users`);
  log.debug(result, 'All users');
  return result;
}

async function getLocationUsers(location) {
  log.info(`Getting users for '${location}'`);
  const result = await request(`${server}/city/${location}/users`);
  log.debug(result, `Users returned for '${location}'`);
  return result;
}

async function forwardGeocode(location) {
  log.info(`Geocoding '${location}'`);
  const result = await request(`${geocode}/${encodeURIComponent(location)}?json=1`);
  log.debug(result, `Geocoding result for '${location}'`);
  return result;
}

module.exports = {
  forwardGeocode,
  getAllUsers,
  getLocationUsers,
};
