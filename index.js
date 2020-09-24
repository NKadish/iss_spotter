const fetchMyIP = require('./iss');
const fetchCoordsByIP = require('./iss');
const fetchISSFlyOverTimes = require('./iss');
const nextISSTimesForMyLocation = require('./iss');


/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});*/

/* fetchCoordsByIP('104.195.200.163', (error, longLat) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned co-ordinates:' , longLat);
}); */

/* fetchISSFlyOverTimes({ latitude: '43.63190', longitude: '-79.37160' }, (error, flyOver) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned fly over times:' , flyOver);
}); */
const printISSPasses = function(passTimes) {
  for (const passes of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(passes.risetime);
    const duration = passes.duration;
    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printISSPasses(passTimes);
});