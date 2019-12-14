const chai = require('chai');

const logger = require('../../src/utils/logger');
const { level: expectedLogLevel } = require('../../src/config').app.logger;

const { expect } = chai;

describe('logger', () => {
  it('should have the correct properties', () => {
    expect(logger.level()).to.equal(parseInt(expectedLogLevel, 10));
    expect(logger.fields.name).to.equal('people-lister');
  });
});
