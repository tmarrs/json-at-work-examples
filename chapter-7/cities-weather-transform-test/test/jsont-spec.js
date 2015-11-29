'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var jsonT = require('../lib/jsont').jsonT;

describe('cities-jsont', function() {
  var jsonFileName = null;
  var jsonCitiesFileName = null;
  var jsonCityFileName = null;

  var transforms = [];

  // transforms[4] works - kind of:
  /*
  [

{"name": "Rancho Palos Verdes",
"temp": 84.34,
"description": "Sky is Clear"
}
{"name": "San Pedro",
"temp": 84.02,
"description": "Sky is Clear"
}
{"name": "Rosarito",
"temp": 82.47,
"description": "scattered clouds"
}
]
  */
  transforms[4] = {
    'self': '[\n{cities}\n]',
    'cities[*]': '\n{"name": "{$.name}",\n"weather": {\n"temp": {$.main.temp}, \n"description": "{$.weather[0].description}"\n}\n}'
  };

  transforms[7] = {
    'self': '{ "cities": [{cities}] }',
    'cities[*]': '{"name": "{$.name}", ' +
      '"weather": { "temp": {$.main.temp}, "windSpeed": {$.wind.speed}, "description": "{$.weather[0].description}" } },'
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
        //console.log(jsonT(jsonObj, transforms[4]));
      } else {
        throw (err);
      }

      done();
    });
  });

  it('should transform cities JSON data - Part II', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(readFileError,
      jsonObj) {
      if (!readFileError) {
        var jsonStr = jsonT(jsonObj, transforms[7]);

        //console.log(jsonStr);
        //console.log(typeof jsonStr);
        jsonStr = repairJson(jsonStr);
        console.log(repairJson(jsonStr));
        //console.log(JSON.stringify(JSON.parse(jsonStr), null, 2));
      } else {
        throw (readFileError);
      }

      done();
    });
  });
});
