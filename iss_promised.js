const request = require("request-promise-native");
// request is a promise

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const promise = request(`https://ipvigilante.com/json/${ip}`);
  return promise;
};

const fetchISSFlyOverTimes = function(body) {
  // the body is from index2?
  const { latitude, longitude } = JSON.parse(body).data;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};
module.exports = { nextISSTimesForMyLocation };
