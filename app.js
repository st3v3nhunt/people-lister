const express = require('express');
const helmet = require('./src/middleware/helmet');
const log = require('./src/utils/logger');
const router = require('./src/router');

const app = express();

helmet(app);

app.use('/', router);

app.use((req, res) => {
  res.set('Content-Type', 'application/problem+json; charset=utf-8');
  res.status(404).send({ detail: 'Not Found', status: 404, title: 'Not Found' });
});

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () => log.info(`Application is listening on port ${port}`));
