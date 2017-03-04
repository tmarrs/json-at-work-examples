'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var fs = require('fs');
var handlebars = require('handlebars');

describe('cities-handlebars', function() {
  var jsonCitiesFileName = null;
  var htmlTemplateFileName = null;


  beforeEach(function() {
    var baseDir = __dirname + '/../..';

    jsonCitiesFileName = baseDir + '/data/cities-weather-short.json';
    htmlTemplateFileName = baseDir +
      '/templates/transform-html.hbs';
  });


  it('should transform cities JSON data to HTML', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(readJsonFileError,
      jsonObj) {
      if (!readJsonFileError) {
        fs.readFile(htmlTemplateFileName, 'utf8', function(
          readTemplateFileError, templateFileData) {
          if (!readTemplateFileError) {
            var template = handlebars.compile(templateFileData);
            var html = template(jsonObj);

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
