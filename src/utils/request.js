const rp = require('request-promise-native');

const { server } = require('../config').api;

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

function getLocationUsers() {
  return request(`${server}/city/London/users`);
}

module.exports = {
  getAllUsers,
  getLocationUsers,
};
