const router = require('express').Router();
const people = require('./people');

router.get('/', (req, res) => {
  res.json({ greeting: 'hello' });
});

router.get('/people', people);

module.exports = router;
