const haversine = require('haversine');

function filterUsers(users, origin, distance) {
  return users.filter((x) => {
    const dest = { latitude: parseFloat(x.latitude), longitude: parseFloat(x.longitude) };
    const distanceBetweenPoints = haversine(origin, dest, { unit: 'mile' });
    return distanceBetweenPoints <= distance ? x : undefined;
  });
}

module.exports = filterUsers;
