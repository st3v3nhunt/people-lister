const getBaseUrl = require('../utils/getBaseUrl');

function rootRoute(req, res) {
  const baseUrl = getBaseUrl(req);

  /* eslint-disable sort-keys */
  res.json({
    links: [
      {
        title: 'List users living in London',
        detail: 'A request is made to /city/London/users. All users are returned, even though the coordinates of the users are not near London! 6 users are returned.',
        url: `${baseUrl}/people?location=london`,
      },
      {
        title: 'List users living within 50 miles of London',
        detail: 'A request is made to /users. The list is filtered using the haversine formula to calculate the distance between the coordinates of the user and London. Only users within 50 miles are returned. The coordinates used for London are 51.5074, 0.1278. 3 users are returned.',
        url: `${baseUrl}/people?location=london&distance=50`,
      },
      {
        title: 'List users living in {location}',
        detail: 'A request is made to /city/{location}/users. The first letter of {location} is capitalised as it appears this is needed for the source API to match. Additional notes have been made within the README regarding case (in)sensitivity.',
        url: `${baseUrl}/people?location={location}`,
      },
      {
        title: 'List users living within {distance} miles of {location}',
        detail: 'A request is made to /users. The list is filtered using the haversine formula to calculate the distance between the coordinates of the user and {location}. Only users within {distance} miles are returned. The endpoint used for forward geocoding {location} has no guarantees. If the lookup fails a 500 response will be returned. If {location} can not be found, a 404 will be returned.',
        url: `${baseUrl}/people?location={location}&distance={distance}`,
      },
      {
        title: 'List users living in Valencia',
        url: `${baseUrl}/people?location=vaLEncIA`,
      },
      {
        title: 'List users living within 500 miles of Las Vegas',
        url: `${baseUrl}/people?location=las%20vegas&distance=500`,
      },
    ],
  });
  /* eslint-enable sort-keys */
}

module.exports = rootRoute;
