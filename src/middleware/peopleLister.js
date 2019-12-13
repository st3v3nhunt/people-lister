const notFound = require('./notFound');
const { distanceSearchType } = require('../config').app;
const filterUsers = require('../utils/filterUsers');
const { getAllUsers, getLocationUsers } = require('../utils/request');

async function peopleLister(req, res) {
  const { searchType } = res.locals;

  try {
    if (searchType === distanceSearchType) {
      // TODO: perform lookup based on location - currently hardcoded to London
      const origin = { latitude: 51.5074, longitude: 0.1278 };
      const data = await getAllUsers();

      const users = filterUsers(data, origin);
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

module.exports = peopleLister;
