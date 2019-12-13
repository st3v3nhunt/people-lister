const haversine = require('haversine');
const rp = require('request-promise-native');

const { server } = require('../config').api;
const badRequest = require('./badRequest');
const notFound = require('./notFound');

async function people(req, res) {
  const { location, distance: dist } = req.query;
  const distance = parseInt(dist, 10);

  // TODO: Refactor to request validator
  if (!location) {
    badRequest(req, res, 'Request must contain a \'location\' parameter.');
  } else if (location.toLowerCase() !== 'london') {
    notFound(req, res);
  } else if (dist) {
    if (distance === 50) {
      const options = {
        json: true,
        uri: `${server}/users`,
      };
      try {
        const data = await rp(options);
        const users = [];
        // TODO: perform lookup based on location
        const origin = { latitude: 51.5074, longitude: 0.1278 };

        data.forEach((x) => {
          const dest = { latitude: parseFloat(x.latitude), longitude: parseFloat(x.longitude) };
          const distanceBetweenPoints = haversine(origin, dest, { unit: 'mile' });
          if (distanceBetweenPoints <= 50) {
            users.push(x);
          }
        });
        res.status(200).json(users);
      } catch (err) {
        // TODO: differentiate between different errors???
        notFound(req, res);
      }
    } else {
      badRequest(req, res, 'Distance must be 50.');
    }
  } else {
    const options = {
      json: true,
      uri: `${server}/city/London/users`,
    };
    try {
      const data = await rp(options);
      res.status(200).json(data);
    } catch (err) {
      // TODO: differentiate between different errors???
      notFound(req, res);
    }
  }
}

module.exports = people;
