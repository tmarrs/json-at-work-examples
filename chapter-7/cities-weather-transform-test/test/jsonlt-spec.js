'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var JSONLT = require('jsonlt');
var jsonlt = new JSONLT(true);

var rulesObject = {
  "id": "#id",
  "name": "#name",
  "temp": "#main.temp",
  "descriptions": "#weather*description",
};

describe('cities-jsonlt', function() {
  var jsonFileName = null;
  var jsonCitiesFileName = null;
  var jsonCityFileName = null;

  beforeEach(function() {
    var baseDir = __dirname + '/../../data';

    jsonFileName = baseDir + '/speaker.json';
    jsonCitiesFileName = baseDir + '/cities-weather.json';
    jsonCityFileName = baseDir + '/city-weather.json';
  });

  it('should transform JSON', function(done) {
    jsonfile.readFile(jsonCityFileName, function(err, jsonObj) {
      if (!err) {
        //console.log('\n\n\n\Original JSON');
        //console.log(jsonObj);
        //console.log("Description = " + jsonObj.weather[0].description);
        //var output = jsonlt.transform(jsonObj, rulesObject);
        //console.log('\n\n\n\Tranformed JSON');
        //console.log(JSON.stringify(output));
      } else {
        throw (err);
      }

      done();
    });
  });

});
