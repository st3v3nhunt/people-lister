const badRequest = require('./badRequest');
const notFound = require('./notFound');
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
  if (location.toLowerCase() !== 'london') {
    return notFound(req, res);
  }
  return next();
}

module.exports = {
  validateDistance,
  validateLocation,
};
