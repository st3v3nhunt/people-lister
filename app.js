const express = require('express');
const helmet = require('./src/middleware/helmet');
const log = require('./src/utils/logger');
const notFound = require('./src/middleware/notFound');
const router = require('./src/router');

const app = express();

helmet(app);

app.use('/', router);

app.use(notFound);

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () => log.info(`Application is listening on port ${port}`));
