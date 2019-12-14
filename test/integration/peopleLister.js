const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');

const app = require('../../app');
const { server } = require('../../src/config').api;
const { expect400, expect404 } = require('../utils/expectations');

const zeroLondoners = require('../resources/zero-london-users.json');
const londonCityUsers = require('../resources/london-city-users.json');
const twoLondoners = require('../resources/two-london-users.json');

const { expect } = chai;

chai.use(chaiHttp);

describe('people route', () => {
  const validLocation = 'london';

  describe('without location param', () => {
    it('should return 400 JSON response when location param is not supplied', async () => {
      const res = await chai.request(app).get('/people');

      expect400(res, 'Request must contain a \'location\' parameter.');
    });

    it('should return 400 JSON response when location param is empty', async () => {
      const res = await chai.request(app).get('/people').query({ location: '' });

      expect400(res, 'Request must contain a \'location\' parameter.');
    });
  });

  describe('with location param only', () => {
    it('should return 404 JSON response when location is not london', async () => {
      const location = 'not-london';
      const res = await chai.request(app).get('/people').query({ location });

      expect404(res, `No results found for '${location}'.`);
    });

    ['London', 'london', 'LONDON'].forEach((location) => {
      it(`should return 'London' users when request is for 'london', regardless of input casing (test case - '${location}')`, async () => {
        nock(server)
          .get('/city/London/users')
          .reply(200, londonCityUsers);

        const res = await chai.request(app).get('/people').query({ location });

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.instanceof(Array);
        expect(res.body.length).to.equal(6);
      });
    });

    [400, 403, 404, 500].forEach((errorStatus) => {
      it(`should return 404 JSON response when request to API returns an error (test case - '${errorStatus}')`, async () => {
        nock(server)
          .get('/city/London/users')
          .reply(errorStatus, 'differing messages from the API - not important');

        const res = await chai.request(app).get('/people').query({ location: validLocation });

        expect404(res, `No results found for '${validLocation}'.`);
      });
    });
  });

  describe('with location and distance param', () => {
    it('should return 400 JSON response when distance is included but is not 50', async () => {
      const distance = 'not-50';
      const res = await chai.request(app).get('/people').query({ distance, location: validLocation });

      expect400(res, 'Distance must be 50.');
    });

    it('should return 200 JSON response when no users are located within 50 miles of London', async () => {
      nock(server)
        .get('/users')
        .reply(200, zeroLondoners);
      const distance = 50;
      const res = await chai.request(app).get('/people').query({ distance, location: validLocation });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.instanceof(Array);
      expect(res.body.length).to.equal(0);
    });

    it('should return 200 JSON reponse when users are located within 50 miles of London', async () => {
      nock(server)
        .get('/users')
        .reply(200, twoLondoners);
      const distance = 50;
      const res = await chai.request(app).get('/people').query({ distance, location: validLocation });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.instanceof(Array);
      expect(res.body.length).to.equal(2);
    });
  });
});
