const { nextISSTimesForMyLocation } = require("./iss_promised");

// const promise1 = fetchMyIP();

// promises resolves to data/json

// promise1
// .then is when promise resolves
// it can resolve 5 seconds later
// resultP1 is the return from promise1
// .then(resultP1 => {
//   const promise2 = fetchCoordsByIP(resultP1);
//   return promise2;
// })
// when pass the function inside then(),do not need to invoked
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body));

const printPassTimes = function(passTimes) {
  for (const passtime of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passtime.risetime);
    const duration = passtime.duration;
    console.log(`next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch(error => {
    console.log("it does not work", error.message);
  });
