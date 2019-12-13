function badRequest(req, res, msg) {
  const badRequestStatus = 400;

  res.set('Content-Type', 'application/problem+json; charset=utf-8')
    .status(badRequestStatus)
    .send({ detail: msg, status: badRequestStatus, title: 'Bad Request' });
}

module.exports = badRequest;
