const haversine = require('haversine');

function filterUsers(users, origin) {
  return users.filter((x) => {
    const dest = { latitude: parseFloat(x.latitude), longitude: parseFloat(x.longitude) };
    const distanceBetweenPoints = haversine(origin, dest, { unit: 'mile' });
    return distanceBetweenPoints <= 50 ? x : undefined;
  });
}

module.exports = filterUsers;
