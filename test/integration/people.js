const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const app = require('../../app');
const { expect400, expect404 } = require('../utils/expectations');
const cityLondonUsers = require('../resources/city.london.users.json');

const { expect } = chai;

chai.use(chaiHttp);

describe('people route', () => {
  describe('without location query', () => {
    it('should return 400 response as JSON when location param is not supplied', async () => {
      const res = await chai.request(app).get('/people');

      expect400(res, 'Request must contain a \'location\' parameter.');
    });

    it('should return 400 response as JSON when location param is empty', async () => {
      const res = await chai.request(app).get('/people').query({ location: '' });

      expect400(res, 'Request must contain a \'location\' parameter.');
    });
  });

  describe('with location query', () => {
    it('should return 404 response as JSON when location is not london', async () => {
      const location = 'not-london';
      const res = await chai.request(app).get('/people').query({ location });

      expect404(res, `No results found for '${location}'.`);
    });

    ['London', 'london', 'LONDON'].forEach((location) => {
      it(`should return 'London' people when request is for 'london', regardless of input casing - testing '${location}'`, async () => {
        nock('https://bpdts-test-app.herokuapp.com/')
          .get('/city/London/users')
          .reply(200, cityLondonUsers);

        const res = await chai.request(app).get('/people').query({ location });

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.instanceof(Array);
        expect(res.body.length).to.equal(6);
      });
    });

    [400, 403, 404, 500].forEach((errorStatus) => {
      it(`should return 404 response as JSON when request to API return an error - testing '${errorStatus}'`, async () => {
        nock('https://bpdts-test-app.herokuapp.com/')
          .get('/city/London/users')
          .reply(errorStatus, 'differing messages from the API - not important');

        const location = 'london';
        const res = await chai.request(app).get('/people').query({ location });

        expect404(res, `No results found for '${location}'.`);
      });
    });
  });
});
