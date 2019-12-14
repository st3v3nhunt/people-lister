const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');

const app = require('../../app');
const { server } = require('../../src/config').api;
const { expect400, expect404 } = require('../utils/expectations');

const ÄlvsjöForwardGeocodeResponse = require('../resources/Älvsjö-forward-geocode.json');
const cityUsersResponse = require('../resources/city-users.json');
const twoLondonUsersResponse = require('../resources/two-london-users.json');
const twoÄlvsjöUsersResponse = require('../resources/two-Älvsjö-users.json');
const zeroCityDwellersResponse = require('../resources/zero-city-users.json');

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
    ['Abcdef', 'abcdef', 'ABCDEF'].forEach((location) => {
      it(`should capitalise the first letter of the location value, regardless of input casing (test case - '${location}')`, async () => {
        nock(server)
          .get('/city/Abcdef/users')
          .reply(200, cityUsersResponse);

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
          .get(`/city/${errorStatus}/users`)
          .reply(errorStatus, 'differing messages from the API - not important');

        const res = await chai.request(app).get('/people').query({ location: validLocation });

        expect404(res, `No results found for '${validLocation}'.`);
      });
    });
  });

  describe('with location and distance param', () => {
    it('should return 200 JSON response when no users are located within 50 miles of London', async () => {
      nock(server)
        .get('/users')
        .reply(200, zeroCityDwellersResponse);
      const distance = 50;
      const res = await chai.request(app).get('/people').query({ distance, location: validLocation });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.instanceof(Array);
      expect(res.body.length).to.equal(0);
    });

    it('should return 200 JSON response when all users are located within 10000 miles of London', async () => {
      nock(server)
        .get('/users')
        .reply(200, zeroCityDwellersResponse);
      const distance = 10000;
      const res = await chai.request(app).get('/people').query({ distance, location: validLocation });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.instanceof(Array);
      expect(res.body.length).to.equal(10);
    });

    it('should return 200 JSON reponse when users are located within 50 miles of London', async () => {
      nock(server)
        .get('/users')
        .reply(200, twoLondonUsersResponse);
      const distance = 50;
      const res = await chai.request(app).get('/people').query({ distance, location: validLocation });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.instanceof(Array);
      expect(res.body.length).to.equal(2);
    });

    it('should return 200 JSON reponse after having looked up a non-London location', async () => {
      const location = 'Älvsjö';
      nock('https://geocode.xyz')
        .get(`/${encodeURIComponent(location)}`)
        .query({ json: 1 })
        .reply(200, ÄlvsjöForwardGeocodeResponse);

      nock(server)
        .get('/users')
        .reply(200, twoÄlvsjöUsersResponse);

      const distance = 50;
      const res = await chai.request(app).get('/people').query({ distance, location });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.instanceof(Array);
      expect(res.body.length).to.equal(2);
    });
  });
});
