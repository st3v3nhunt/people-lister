const badRequest = require('./badRequest');
const { distanceSearchType } = require('../config').app;

function validateDistance(req, res, next) {
  const { distance } = req.query;

  if (distance) {
    res.locals.searchType = distanceSearchType;
    if (parseInt(distance, 10) !== 50) {
      return badRequest(req, res, 'Distance must be 50.');
    }
  }

  return next();
}

function validateLocation(req, res, next) {
  const { location } = req.query;

  if (!location) {
    return badRequest(req, res, 'Request must contain a \'location\' parameter.');
  }
  const lowercaseLocation = location.toLowerCase();
  res.locals.location = `${location.charAt(0).toUpperCase()}${lowercaseLocation.slice(1)}`;
  return next();
}

module.exports = {
  validateDistance,
  validateLocation,
};
