const { port } = require('../config').app;

function getBaseUrl(req) {
  const { hostname, protocol } = req;
  const deployed = process.env.DEPLOYED;
  return deployed ? `https://${hostname}` : `${protocol}://${hostname}:${port}`;
}

module.exports = getBaseUrl;
