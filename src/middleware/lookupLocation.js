const errorResponse = require('./errorResponse');
const { distanceSearchType } = require('../config').app;
const getLocationCoordinates = require('../utils/getLocationCoordinates');

async function lookupLocation(req, res, next) {
  const { location, searchType } = res.locals;

  if (searchType === distanceSearchType) {
    let origin;
    try {
      origin = await getLocationCoordinates(location);
      res.locals.origin = origin;
      if (origin.error) {
        return errorResponse(req, res, { status: 404 });
      }
    } catch (err) {
      return errorResponse(req, res, { status: 500 });
    }
  }
  return next();
}

module.exports = lookupLocation;
