const helmet = require('helmet');

function config(app) {
  app.use(helmet({
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'no-referrer' },
  }));
}

module.exports = config;
