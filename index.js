const { fetchMyIP, fetchCoordsByIP } = require("./iss");

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
