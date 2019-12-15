const chai = require('chai');

const { expect } = chai;

function expectErrorResponse(res, statusCode, message) {
  let title;
  switch (statusCode) {
    case 400:
      title = 'Bad Request';
      message = message || title;
      break;
    case 404:
      title = 'Not Found';
      message = message || title;
      break;
    case 500:
      title = 'Internal Server Error';
      message = message || title;
      break;
    default:
      throw new Error('Unknown status code being tested');
  }

  expect(res).to.have.status(statusCode);
  expect(res).to.have.header('Content-Type', 'application/problem+json; charset=utf-8');
  expect(res.body).to.have.all.keys('status', 'detail', 'title');
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

function expect500(res, message) {
  expectErrorResponse(res, 500, message);
}

module.exports = {
  expect400,
  expect404,
  expect500,
};
