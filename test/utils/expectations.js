const chai = require('chai');

const { expect } = chai;

function expectErrorResponse(res, statusCode, message) {
  let title;
  switch (statusCode) {
    case 400:
      title = 'Bad Request';
      message = message || 'Bad Request';
      break;
    case 404:
      title = 'Not Found';
      message = message || 'Not Found';
      break;
    default:
      throw new Error('Unknown status code being tested');
  }

  expect(res).to.have.status(statusCode);
  expect(res).to.have.header('Content-Type', 'application/problem+json; charset=utf-8');
  expect(res.body).to.have.property('status', statusCode);
  expect(res.body).to.have.property('detail', message);
  expect(res.body).to.have.property('title', title);
}

function expect400(res, message) {
  expectErrorResponse(res, 400, message);
}

function expect404(res, message) {
  expectErrorResponse(res, 404, message);
}

module.exports = {
  expect400,
  expect404,
};
