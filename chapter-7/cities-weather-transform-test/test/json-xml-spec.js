'use strict';

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
    /*  
    var obj = {name: "Super", Surname: "Man", age: 23};
     
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    */
    done();
  });

  it('should transform cities XML data to JSON', function(done) {
    fs.readFile(xmlCitiesFileName, 'utf8', function(
      readXmlFileError, xmlData) {
      if (!readXmlFileError) {
        var parser = new xml2js.Parser();

        parser.parseString(xmlData, function(error, xmlObj) {
          if (!error) {
            console.log('\n\n\nParsed XML Output:\n' +
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
