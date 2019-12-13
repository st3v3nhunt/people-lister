const router = require('express').Router();

const people = require('./people');
const { validateLocation, validateDistance } = require('./requestValidator');

router.get('/', (req, res) => {
  res.json({ greeting: 'hello' });
});

router.get(
  '/people',
  validateLocation,
  validateDistance,
  people
);

module.exports = router;
