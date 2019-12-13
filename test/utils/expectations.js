const chai = require('chai');

const { expect } = chai;

function expect404(res) {
  expect(res).to.have.status(404);
  expect(res).to.have.header('Content-Type', 'application/problem+json; charset=utf-8');
  expect(res.body).to.have.property('status', 404);
  expect(res.body).to.have.property('detail', 'Not Found');
  expect(res.body).to.have.property('title', 'Not Found');
}

module.exports = {
  expect404,
};
