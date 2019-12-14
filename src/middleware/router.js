const router = require('express').Router();

const peopleLister = require('./peopleLister');
const { validateLocation, validateDistance } = require('./requestValidator');
const rootRoute = require('./rootRoute');

router.get('/', rootRoute);

router.get(
  '/people',
  validateLocation,
  validateDistance,
  peopleLister
);

module.exports = router;
