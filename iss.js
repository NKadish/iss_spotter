/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, ipObj) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${ipObj}`;
      callback(Error(msg), null);
      return;
    }
    const userIP = JSON.parse(ipObj).ip;
    callback(error, userIP);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Looks like something is up with your IP! Status code: ${response.statusCode} is given when getting it. Please Try again!`));
      return;
    }
    const userLongLat = {};
    userLongLat.latitude = JSON.parse(body).data.latitude;
    userLongLat.longitude = JSON.parse(body).data.longitude;
    callback(error, userLongLat);
  });
};

module.exports = fetchMyIP;
module.exports = fetchCoordsByIP;
