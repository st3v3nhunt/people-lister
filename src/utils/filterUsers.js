const haversine = require('haversine');

function filterUsers(users, orig, distance) {
  const origin = { latitude: parseFloat(orig.latitude), longitude: parseFloat(orig.longitude) };
  return users.filter((x) => {
    const dest = { latitude: parseFloat(x.latitude), longitude: parseFloat(x.longitude) };
    const distanceBetweenPoints = haversine(origin, dest, { unit: 'mile' });
    return distanceBetweenPoints <= distance ? x : undefined;
  });
}

module.exports = filterUsers;
