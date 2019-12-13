const chai = require('chai');

const { expect } = chai;

function expect400(res, detail) {
  const statusCode = 400;
  const message = 'Bad Request';

  expect(res).to.have.status(statusCode);
  expect(res).to.have.header('Content-Type', 'application/problem+json; charset=utf-8');
  expect(res.body).to.have.property('status', statusCode);
  expect(res.body).to.have.property('detail', detail);
  expect(res.body).to.have.property('title', message);
}

function expect404(res, detail = 'Not Found') {
  const statusCode = 404;
  const message = 'Not Found';

  expect(res).to.have.status(statusCode);
  expect(res).to.have.header('Content-Type', 'application/problem+json; charset=utf-8');
  expect(res.body).to.have.property('status', statusCode);
  expect(res.body).to.have.property('detail', detail);
  expect(res.body).to.have.property('title', message);
}

module.exports = {
  expect400,
  expect404,
};
