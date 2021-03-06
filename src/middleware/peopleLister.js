const errorResponse = require('./errorResponse');
const { distanceSearchType } = require('../config').app;
const filterUsers = require('../utils/filterUsers');
const { getAllUsers, getLocationUsers } = require('../utils/request');

async function peopleLister(req, res) {
  const {
    distance,
    location,
    origin,
    searchType,
  } = res.locals;

  try {
    if (searchType === distanceSearchType) {
      const data = await getAllUsers();

      const users = filterUsers(data, origin, distance);
      res.status(200).json(users);
    } else {
      const data = await getLocationUsers(location);
      res.status(200).json(data);
    }
  } catch (err) {
    errorResponse(req, res, { status: 500 });
  }
}

module.exports = peopleLister;
