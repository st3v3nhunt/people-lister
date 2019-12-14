const { distanceSearchType } = require('../config').app;
const notFound = require('./notFound');
const serverError = require('./serverError');
const getLocationCoordinates = require('../utils/getLocationCoordinates');

async function lookupLocation(req, res, next) {
  const { location, searchType } = res.locals;

  if (searchType === distanceSearchType) {
    let origin;
    try {
      origin = await getLocationCoordinates(location);
      res.locals.origin = origin;
      if (origin.error) {
        notFound(req, res);
      } else {
        next();
      }
    } catch (err) {
      // TODO: proper loggin
      console.log(err);
      serverError(req, res);
    }
  } else {
    next();
  }
}

module.exports = lookupLocation;
