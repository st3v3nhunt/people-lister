const { distanceSearchType } = require('../config').app;
const notFound = require('./notFound');
const getLocationCoordinates = require('../utils/getLocationCoordinates');

async function lookupLocation(req, res, next) {
  const { location, searchType } = res.locals;

  if (searchType === distanceSearchType) {
    let origin;
    try {
      origin = await getLocationCoordinates(location);
    } catch (err) {
      console.log(err);
      // log and return a server error response
      // return serverError();
    }

    res.locals.origin = origin;
    if (origin.error) {
      notFound(req, res);
    } else {
      next();
    }
  } else {
    next();
  }
}

module.exports = lookupLocation;
