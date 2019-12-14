const { distanceSearchType } = require('../config').app;
const errorResponse = require('./errorResponse');
const getLocationCoordinates = require('../utils/getLocationCoordinates');

async function lookupLocation(req, res, next) {
  const { location, searchType } = res.locals;

  if (searchType === distanceSearchType) {
    let origin;
    try {
      origin = await getLocationCoordinates(location);
      res.locals.origin = origin;
      if (origin.error) {
        errorResponse(req, res, { status: 404 });
      } else {
        next();
      }
    } catch (err) {
      errorResponse(req, res, { status: 500 });
    }
  } else {
    next();
  }
}

module.exports = lookupLocation;
