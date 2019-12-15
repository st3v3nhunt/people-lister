const log = require('../utils/logger');

function errorResponse(req, res, options) {
  const { message, status } = options;
  const { originalUrl, query: { location } } = req;

  const msg = {
    status,
    url: originalUrl,
  };

  switch (status) {
    case 400:
      msg.title = 'Bad Request';
      msg.detail = message || msg.title;
      break;
    case 404:
      msg.title = 'Not Found';

      if (location !== undefined) {
        msg.detail = `No results found for '${location}'.`;
      } else {
        msg.detail = message || msg.title;
      }
      break;
    case 500:
      msg.title = 'Internal Server Error';
      msg.detail = message || msg.title;
      break;
    default:
      break;
  }

  log.warn(msg);
  delete msg.url;

  res.set('Content-Type', 'application/problem+json; charset=utf-8')
    .status(status)
    .send(msg);
}

module.exports = errorResponse;
