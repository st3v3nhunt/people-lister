const chai = require('chai');

const { port } = require('../../../src/config').app;
const getBaseUrl = require('../../../src/utils/getBaseUrl');

const { expect } = chai;

describe('getBaseUrl', () => {
  const hostname = 'hostname';
  const protocol = 'http';
  const req = { hostname, protocol };

  let currentDeployedStat;

  beforeEach('setup', () => {
    currentDeployedStat = process.env.DEPLOYED;
  });

  afterEach('reset', () => {
    process.env.DEPLOYED = currentDeployedStat;
  });

  describe('when DEPLOYED is not set', () => {
    it('should return req\'s protocol and port', () => {
      delete process.env.DEPLOYED;
      const result = getBaseUrl(req);

      expect(result).to.equal(`${protocol}://${hostname}:${port}`);
    });
  });

  describe('when DEPLOYED is set', () => {
    it('should return https protocol and no port', () => {
      process.env.DEPLOYED = true;
      const result = getBaseUrl(req);

      expect(result).to.equal(`https://${hostname}`);
    });
  });
});
