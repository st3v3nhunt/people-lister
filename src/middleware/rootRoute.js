const { port } = require('../config').app;

function rootRoute(req, res) {
  const { hostname, protocol } = req;
  const baseURL = `${protocol}://${hostname}:${port}`;

  res.json({
    links: [{
      detail: 'A request is made to /city/London/users. All users are returned, even though the coordinates of the users are not near London! 6 users are returned.',
      title: 'Users living in London',
      url: `${baseURL}/people?location=london`,
    },
    {
      detail: 'A request is made to /users. The list is filtered using the haversine formula to calculate the distance between the coordinates of the user and London. Only users within 50 miles are returned. The coordinates used for London are 51.5074, 0.1278. 3 users are returned.',
      title: 'Users living within 50 miles of London',
      url: `${baseURL}/people?location=london&distance=50`,
    }],
  });
}

module.exports = rootRoute;
