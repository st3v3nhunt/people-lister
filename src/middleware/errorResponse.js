function errorResponse(req, res, options) {
  const { message, status } = options;
  let title;
  let detail;

  const { location } = req.query;

  switch (status) {
    case 400:
      title = 'Bad Request';
      detail = message || title;
      break;
    case 404:
      title = 'Not Found';
      detail = message || title;

      if (location !== undefined) {
        detail = `No results found for '${location}'.`;
      }
      break;
    case 500:
      title = 'Internal Server Error';
      detail = message || title;
      break;
    default:
      break;
  }

  res.set('Content-Type', 'application/problem+json; charset=utf-8')
    .status(status)
    .send({ detail, status, title });
}

module.exports = errorResponse;
