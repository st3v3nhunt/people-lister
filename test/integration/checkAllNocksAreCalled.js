const chai = require('chai');
const nock = require('nock');

const log = require('../../src/utils/logger');

const { expect } = chai;

after('Check all nocks have been called', () => {
  try {
    log.fatal(nock.pendingMocks());
    expect(nock.pendingMocks().length).to.equal(0);
    expect(nock.isDone()).to.equal(true);
  } finally {
    // Cleans up nocks for next test run
    nock.cleanAll();
  }
});
