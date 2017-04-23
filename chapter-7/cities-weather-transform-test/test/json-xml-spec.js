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
var fs = require('fs');
var xml2js = require('xml2js');


describe('json-xml', function() {
  var jsonCitiesFileName = null;
  var xmlCitiesFileName = null;

  beforeEach(function() {
    var baseDir = __dirname + '/../..';

    jsonCitiesFileName = baseDir + '/data/cities-weather-short.json';
    xmlCitiesFileName = baseDir +
      '/data/cities-weather-short.xml';
  });

  it('should transform cities JSON data to XML', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(readJsonFileError,
      jsonObj) {
      if (!readJsonFileError) {
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(jsonObj);

        console.log('\n\n\nXML Output:\n' + xml);
        done();
      } else {
        done(readJsonFileError);
      }
    });
  });

  it('should transform cities XML data to JSON', function(done) {
    fs.readFile(xmlCitiesFileName, 'utf8', function(
      readXmlFileError, xmlData) {
      if (!readXmlFileError) {
        var parser = new xml2js.Parser();

        parser.parseString(xmlData, function(error, xmlObj) {
          if (!error) {
            console.log('\n\n\nJSON Output:\n' +
              JSON.stringify(xmlObj, null, 2));

            done();
          } else {
            done(error);
          }
        });
      } else {
        done(readXmlFileError);
      }
    });
  });
});
