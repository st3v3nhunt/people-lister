const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const { expect404 } = require('../utils/expectations');

const { expect } = chai;

chai.use(chaiHttp);

describe('basic features', () => {
  describe('valid route', () => {
    it('should return 200 JSON response with links for the instructions', async () => {
      const res = await chai.request(app).get('/');

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('links');
    });
  });

  describe('unknown route', () => {
    it('should return 404 response in the problem detail format', async () => {
      const res = await chai.request(app).get('/unknown');

      expect404(res);
    });
  });

  describe('security headers', () => {
    let res;

    before('make request', async () => {
      res = await chai.request(app).get('/');
    });

    it('should return security related headers', () => {
      expect(res).to.have.header('X-DNS-Prefetch-Control', 'off');
      expect(res).to.have.header('X-Frame-Options', 'DENY');
      expect(res).to.have.header('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
      expect(res).to.have.header('X-Download-Options', 'noopen');
      expect(res).to.have.header('X-Content-Type-Options', 'nosniff');
      expect(res).to.have.header('Referrer-Policy', 'no-referrer');
      expect(res).to.have.header('X-Xss-Protection', '1; mode=block');
    });

    it('should not return tech advertising headers', () => {
      expect(res).to.not.have.header('X-Powered-By');
    });
  });
});
