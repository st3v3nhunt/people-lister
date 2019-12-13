const express = require('express');
const helmet = require('./src/middleware/helmet');
const log = require('./src/utils/logger');

const app = express();

helmet(app);

app.get('/', (req, res) => {
  res.json({ greeting: 'hello' });
});

app.get('/people', (req, res) => {
  const { location } = req.query;

  if (!location) {
    const badRequestStatus = 400;
    res.set('Content-Type', 'application/problem+json; charset=utf-8');
    res.status(badRequestStatus).send({ detail: 'Request must contain a \'location\' parameter.', status: badRequestStatus, title: 'Bad Request' });
  } else if (location.toLowerCase() !== 'london') {
    const notFoundStatus = 404;
    res.set('Content-Type', 'application/problem+json; charset=utf-8');
    res.status(notFoundStatus).send({ detail: 'Not Found', status: notFoundStatus, title: 'Not Found' });
  } else {
    res.status(200).send({ work: 'in progress' });
  }
});

app.use((req, res) => {
  res.set('Content-Type', 'application/problem+json; charset=utf-8');
  res.status(404).send({ detail: 'Not Found', status: 404, title: 'Not Found' });
});

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () => log.info(`Application is listening on port ${port}`));
