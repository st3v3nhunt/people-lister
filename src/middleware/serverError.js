function serverError(req, res) {
  // TODO: Make generate error response middleware
  const detail = 'Internal Server Error';
  const status = 500;
  // const { location } = req.query;

  // if (location !== undefined) {
  //   detail = `No results found for '${location}'.`;
  // }

  res.set('Content-Type', 'application/problem+json; charset=utf-8')
    .status(status)
    .send({ detail, status, title: 'Internal Server Error' });
}

module.exports = serverError;
