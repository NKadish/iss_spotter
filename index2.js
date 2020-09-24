const { nextISSTimesForMyLocation } = require('./iss_promised');

const printISSPasses = function(passTimes) {
  for (const passes of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(passes.risetime);
    const duration = passes.duration;
    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printISSPasses(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });