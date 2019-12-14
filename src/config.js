const config = {
  api: {
    geocode: 'https://geocode.xyz',
    server: process.env.API_SERVER || 'https://bpdts-test-app.herokuapp.com',
  },
  app: {
    distanceSearchType: 'distance',
    locationSearchType: 'location',
    port: process.env.PORT || 3000,
  },
};

module.exports = config;
