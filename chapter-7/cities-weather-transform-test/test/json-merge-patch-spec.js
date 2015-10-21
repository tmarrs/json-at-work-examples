'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var jsonmergepatch = require('json-merge-patch');

var source = {
  "id": 5386035,
  "name": "Rancho Palos Verdes",
  "coord": {
    "lon": -118.387016,
    "lat": 33.744461
  },
  "main": {
    "temp": 84.34,
    "pressure": 1012,
    "humidity": 58,
    "temp_min": 78.8,
    "temp_max": 93
  },
  "dt": 1442171078,
  "wind": {
    "speed": 4.1,
    "deg": 300
  },
  "clouds": {
    "all": 5
  },
  "weather": [{
    "id": 800,
    "main": "Clear",
    "description": "Sky is Clear",
    "icon": "02d"
  }]
};

var target = {
  "coord": null,
  "main": null,
  "dt": null,
  "wind": null,
  "clouds": null,
  "weather": null
};

var patch2 = {
  "coord": null,
  "main": null,
  "dt": null,
  "wind": null,
  "clouds": null,
  "weather": [{
    "id": null
  }]
}

describe('cities-json-merge-patch', function() {
  var jsonFileName = null;
  var jsonCitiesFileName = null;
  var jsonCityFileName = null;

  beforeEach(function() {
    var baseDir = __dirname + '/../../data';

    jsonFileName = baseDir + '/speaker.json';
    jsonCitiesFileName = baseDir + '/cities-weather.json';
    jsonCityFileName = baseDir + '/city-weather.json';
  });

  it('should generate a JSON merge patch', function(done) {
    jsonfile.readFile(jsonFileName, function(err, jsonObj) {
      if (!err) {
        //console.log('\n\n\n\Original JSON');
        //console.log(jsonObj);
        //var output = jsonpatch.apply(jsonObj, template);
        //console.log('\n\n\n\Patched JSON');
        //console.log(JSON.stringify(output));
        //var patch = jsonmergepatch.generate(source, target);
        //console.log(patch);
      } else {
        throw (err);
      }

      done();
    });
  });

  it('should do a JSON merge patch', function(done) {
    jsonfile.readFile(jsonCityFileName, function(err, jsonObj) {
      if (!err) {
        //console.log('\n\n\n\Original JSON');
        //console.log(jsonObj);
        //var output = jsonpatch.apply(jsonObj, template);
        //console.log('\n\n\n\Patched JSON');
        //console.log(JSON.stringify(output));
        //var target = jsonmergepatch.apply(source, patch2);
        //console.log(target);
      } else {
        throw (err);
      }

      done();
    });
  });
});
