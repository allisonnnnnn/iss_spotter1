const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("it does notwork!", error);
    // short circuit ->when there is an error, stop the rest
    return;
  }
  console.log("it worked! Returned IP:", ip);
});

fetchCoordsByIP("162.245.144.188", (error, coords) => {
  if (error) {
    console.log("it does not work!", error);
    return;
  }
  console.log("it worked! returned coords", coords);
});

fetchISSFlyOverTimes(
  { latitude: "49.27670", longitude: "-123.13000" },
  (error, runtimes) => {
    if (error) {
      console.log("it does not work!", error);
      return;
    }
    console.log("it worked! returned coords", runtimes);
  }
);

const printPassTimes = function(passTimes) {
  for (const passtime of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passtime.risetime);
    const duration = passtime.duration;
    console.log(`next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("it does not work!", error);
  }

  printPassTimes(passTimes);
});
