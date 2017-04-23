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
var mustache = require('mustache');

describe('cities-mustache', function() {
  var jsonCitiesFileName = null;
  var htmlTemplateFileName = null;


  beforeEach(function() {
    var baseDir = __dirname + '/../..';

    jsonCitiesFileName = baseDir + '/data/cities-weather-short.json';
    htmlTemplateFileName = baseDir +
      '/templates/transform-html.mustache';
  });


  it('should transform cities JSON data to HTML', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(readJsonFileError,
      jsonObj) {
      if (!readJsonFileError) {
        fs.readFile(htmlTemplateFileName, 'utf8', function(
          readTemplateFileError, templateFileData) {
          if (!readTemplateFileError) {
            var template = templateFileData.toString();
            var html = mustache.render(template, jsonObj);

            console.log('\n\n\nHTML Output:\n' + html);
            done();
          } else {
            done(readTemplateFileError);
          }
        });
      } else {
        done(readJsonFileError);
      }
    });
  });
});
