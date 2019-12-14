const express = require('express');

const { port } = require('./src/config').app;
const helmet = require('./src/middleware/helmet');
const errorResponse = require('./src/middleware/errorResponse');
const router = require('./src/middleware/router');
const log = require('./src/utils/logger');

const app = express();

helmet(app);

app.use('/', router);

app.use((req, res) => errorResponse(req, res, { status: 404 }));

module.exports = app.listen(port, () => log.info(`Application is listening on port ${port}`));
