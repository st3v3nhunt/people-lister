const notFound = require('./notFound');
const { distanceSearchType } = require('../config').app;
const getLocationCoordinates = require('../utils/getLocationCoordinates');
const filterUsers = require('../utils/filterUsers');
const { getAllUsers, getLocationUsers } = require('../utils/request');

async function peopleLister(req, res) {
  const { distance, location, searchType } = res.locals;

  try {
    if (searchType === distanceSearchType) {
      const origin = await getLocationCoordinates(location);
      const data = await getAllUsers();

      const users = filterUsers(data, origin, distance);
      res.status(200).json(users);
    } else {
      const data = await getLocationUsers(location);
      res.status(200).json(data);
    }
  } catch (err) {
    // TODO: differentiate between different errors???
    notFound(req, res);
  }
}

module.exports = peopleLister;
