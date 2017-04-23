'use strict';

/* Attribution: Cities Weather data provided by OpenWeatherMap API 
   ([http://openweathermap.org]) under Creative Commons Share A Like 
   License (https://creativecommons.org/licenses/by-sa/4.0).
   Changes were made to the data to work with json-server.
   This does not imply an endorsement by the licensor.
   
   This code is distributed under Creative Commons Share A Like License.
*/

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var jsonT = require('../lib/jsont').jsonT;

describe('cities-jsont', function() {
  var jsonCitiesFileName = null;

  var transformRules = {
    'self': '{ "cities": [{cities}] }',
    'cities[*]': '{ "id": "{$.id}", "name": "{$.name}", ' +
      '"weather": { "currentTemp": {$.main.temp}, "lowTemp": {$.main.temp_min}, ' +
      '"hiTemp": {$.main.temp_max}, "humidity": {$.main.humidity}, ' +
      '"windSpeed": {$.wind.speed}, "summary": "{$.weather[0].main}", ' +
      '"description": "{$.weather[0].description}" } },'
  };

  function repairJson(jsonStr) {
    var repairedJsonStr = jsonStr;

    var repairs = [
      [/,\s*}/gi, ' }'],
      [/,\s*\]/gi, ' ]']
    ];

    for (var i = 0, len = repairs.length; i < len; ++i) {
      repairedJsonStr = repairedJsonStr.replace(repairs[i][0], repairs[i][1]);
    }

    return repairedJsonStr;
  }

  beforeEach(function() {
    var baseDir = __dirname + '/../../data';

    jsonCitiesFileName = baseDir + '/cities-weather-short.json';
  });

  it('should transform cities JSON data', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(readFileError,
      jsonObj) {
      if (!readFileError) {
        var jsonStr = jsonT(jsonObj, transformRules);

        jsonStr = repairJson(jsonStr);
        console.log(JSON.stringify(JSON.parse(jsonStr), null, 2));
        //console.log(jsonStr);
        done();
      } else {
        done(readFileError);
      }
    });
  });
});
