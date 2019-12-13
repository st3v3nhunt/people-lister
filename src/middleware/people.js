const rp = require('request-promise-native');

const { server } = require('../config').api;
const badRequest = require('./badRequest');
const notFound = require('./notFound');

async function people(req, res) {
  const { location } = req.query;

  if (!location) {
    badRequest(req, res);
  } else if (location.toLowerCase() !== 'london') {
    notFound(req, res);
  } else {
    const options = {
      json: true,
      uri: `${server}/city/London/users`,
    };
    try {
      const data = await rp(options);
      res.status(200).json(data);
    } catch (err) {
      // TODO: differentiate between different errors???
      notFound(req, res);
    }
  }
}

module.exports = people;
