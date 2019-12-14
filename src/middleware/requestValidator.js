const errorResponse = require('./errorResponse');
const { distanceSearchType } = require('../config').app;

function validateDistance(req, res, next) {
  let { distance } = req.query;

  if (distance) {
    res.locals.searchType = distanceSearchType;
    distance = parseInt(distance, 10);
    res.locals.distance = distance;
  }

  return next();
}

function validateLocation(req, res, next) {
  const { location } = req.query;

  if (!location) {
    return errorResponse(req, res, { message: 'Request must contain a \'location\' parameter.', status: 400 });
  }
  const lowercaseLocation = location.toLowerCase();
  res.locals.location = `${location.charAt(0).toUpperCase()}${lowercaseLocation.slice(1)}`;
  return next();
}

module.exports = {
  validateDistance,
  validateLocation,
};
