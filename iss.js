const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // error handling
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // why lattitude is undefined
    const { lattitude, longitude } = JSON.parse(body).data;
    // const data = JSON.parse(body).data;
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching coords. response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, { lattitude, longitude });
      // console.log(data.longitude);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
