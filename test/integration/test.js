const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('basic features', () => {
  describe('valid route', () => {
    it('should return 200 response as JSON', async () => {
      const res = await chai.request(app).get('/');

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('greeting', 'hello');
    });
  });

  describe('unknown route', () => {
    it('should return 404 response', async () => {
      const res = await chai.request(app).get('/unknown');

      expect(res).to.have.status(404);
      expect(res.body).to.be.empty;
    });
  });
});
