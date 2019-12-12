const express = require('express');
const log = require('./src/utils/logger');

const app = express();

app.get('/', (req, res) => {
  res.json({ greeting: 'hello' });
});

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () => log.info(`Application is listening on port ${port}`));
