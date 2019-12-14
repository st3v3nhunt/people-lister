const rp = require('request-promise-native');

const { geocode, server } = require('../config').api;

function request(uri) {
  const options = {
    json: true,
    uri,
  };
  return rp(options);
}

function getAllUsers() {
  return request(`${server}/users`);
}

function getLocationUsers(location) {
  return request(`${server}/city/${location}/users`);
}

function forwardGeocode(location) {
  return request(`${geocode}/${encodeURIComponent(location)}?json=1`);
}

module.exports = {
  forwardGeocode,
  getAllUsers,
  getLocationUsers,
};
