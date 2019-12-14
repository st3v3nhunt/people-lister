const bunyan = require('bunyan');

function getLevel() {
  const logLevel = parseInt(process.env.LOG_LEVEL, 10);
  return (Number.isNaN(logLevel)) ? 30 : logLevel;
}

const log = bunyan.createLogger({
  level: getLevel(),
  name: 'people-lister',
  serializers: bunyan.stdSerializers,
});
log.info(`Logging set to '${log.level()}'.`);

module.exports = log;
