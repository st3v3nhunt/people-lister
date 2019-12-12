const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('basic features', () => {
  it('should return 200 response', async () => {
    const res = await chai.request(app).get('/');

    expect(res).to.have.status(200);
    // eslint-disable-next-line no-unused-expressions
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('greeting', 'hello');
  });
});
