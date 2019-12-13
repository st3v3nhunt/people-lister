const router = require('express').Router();

const peopleLister = require('./peopleLister');
const { validateLocation, validateDistance } = require('./requestValidator');

router.get('/', (req, res) => {
  res.json({ greeting: 'hello' });
});

router.get(
  '/people',
  validateLocation,
  validateDistance,
  peopleLister
);

module.exports = router;
