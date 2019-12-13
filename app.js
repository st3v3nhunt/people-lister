const express = require('express');

const { port } = require('./src/config').app;
const helmet = require('./src/middleware/helmet');
const log = require('./src/utils/logger');
const notFound = require('./src/middleware/notFound');
const router = require('./src/middleware/router');

const app = express();

helmet(app);

app.use('/', router);

app.use(notFound);

module.exports = app.listen(port, () => log.info(`Application is listening on port ${port}`));
