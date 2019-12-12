const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'people-lister', serializers: bunyan.stdSerializers });

module.exports = log;
