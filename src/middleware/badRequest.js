function badRequest(req, res) {
  const badRequestStatus = 400;

  res.set('Content-Type', 'application/problem+json; charset=utf-8')
    .status(badRequestStatus)
    .send({ detail: 'Request must contain a \'location\' parameter.', status: badRequestStatus, title: 'Bad Request' });
}

module.exports = badRequest;
