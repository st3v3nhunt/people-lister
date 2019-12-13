function notFound(req, res) {
  let detail = 'Not Found';
  const notFoundStatus = 404;
  const { location } = req.query;

  if (location !== undefined) {
    detail = `No results found for '${location}'.`;
  }

  res.set('Content-Type', 'application/problem+json; charset=utf-8')
    .status(notFoundStatus)
    .send({ detail, status: notFoundStatus, title: 'Not Found' });
}

module.exports = notFound;
