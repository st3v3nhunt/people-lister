const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const { expect404 } = require('../utils/expectations');

chai.use(chaiHttp);

describe('people route', () => {
  describe('root route request', () => {
    it('should return 404 response as JSON', async () => {
      const res = await chai.request(app).get('/people');

      expect404(res);
    });
  });
});
