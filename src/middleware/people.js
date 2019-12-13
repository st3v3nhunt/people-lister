function people(req, res) {
  const { location } = req.query;

  if (!location) {
    const badRequestStatus = 400;
    res.set('Content-Type', 'application/problem+json; charset=utf-8');
    res.status(badRequestStatus).send({ detail: 'Request must contain a \'location\' parameter.', status: badRequestStatus, title: 'Bad Request' });
  } else if (location.toLowerCase() !== 'london') {
    const notFoundStatus = 404;
    res.set('Content-Type', 'application/problem+json; charset=utf-8');
    const detail = `No results found for '${location}'.`;
    res.status(notFoundStatus).send({ detail, status: notFoundStatus, title: 'Not Found' });
  } else {
    res.status(200).send({ work: 'in progress' });
  }
}

module.exports = people;
