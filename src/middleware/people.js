const badRequest = require('./badRequest');
const notFound = require('./notFound');

function people(req, res) {
  const { location } = req.query;

  if (!location) {
    badRequest(req, res);
  } else if (location.toLowerCase() !== 'london') {
    notFound(req, res);
  } else {
    res.status(200).send({ work: 'in progress' });
  }
}

module.exports = people;
