const haversine = require('haversine');

const notFound = require('./notFound');
const { getAllUsers, getLocationUsers } = require('../utils/request');
const { distanceSearchType } = require('../config').app;

async function people(req, res) {
  const { searchType } = res.locals;

  try {
    if (searchType === distanceSearchType) {
      const data = await getAllUsers();
      const users = [];
      // TODO: perform lookup based on location - currently hardcoded to London
      const origin = { latitude: 51.5074, longitude: 0.1278 };

      data.forEach((x) => {
        const dest = { latitude: parseFloat(x.latitude), longitude: parseFloat(x.longitude) };
        const distanceBetweenPoints = haversine(origin, dest, { unit: 'mile' });
        if (distanceBetweenPoints <= 50) {
          users.push(x);
        }
      });
      res.status(200).json(users);
    } else {
      const data = await getLocationUsers();
      res.status(200).json(data);
    }
  } catch (err) {
    // TODO: differentiate between different errors???
    notFound(req, res);
  }
}

module.exports = people;
