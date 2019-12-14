const router = require('express').Router();

const lookupLocation = require('./lookupLocation');
const peopleLister = require('./peopleLister');
const { validateLocation, validateDistance } = require('./requestValidator');
const rootRoute = require('./rootRoute');

router.get('/', rootRoute);

router.get(
  '/people',
  validateLocation,
  validateDistance,
  lookupLocation,
  peopleLister
);

module.exports = router;
