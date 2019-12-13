const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const { expect400, expect404 } = require('../utils/expectations');

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
      const res = await chai.request(app).get('/people').query({ location: 'not-london' });

      expect404(res);
    });

    it.skip('should return 200 response with all people matching query as JSON', async () => {
      const res = await chai.request(app).get('/people').query({ location: 'london' });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.instanceof(Array);
      expect(res.body.length).to.be(100);
    });
  });
});
