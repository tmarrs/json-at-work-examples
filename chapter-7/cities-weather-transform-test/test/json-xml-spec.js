'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var fs = require('fs');
var xml2js = require('xml2js');
var jsonCitiesFileName = null;
var xmlCitiesFileName = null;

/*
beforeEach(function() {
  var baseDir = __dirname + '/../..';

  jsonCitiesFileName = baseDir + '/data/cities-weather-short.json';
  htmlTemplateFileName = baseDir +
    '/templates/transform-full-html.hbs';
});
*/

describe('json-xml', function() {
  it('should transform cities JSON data to XML', function(done) {
    /*  
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/foo.xml', function(err, data) {
    parser.parseString(data);
});
    */
    done();
  });

  it('should transform cities XML data to JSON', function(done) {
    /*
    var fs = require('fs'),
    xml2js = require('xml2js');
 
var obj = {name: "Super", Surname: "Man", age: 23};
 
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
    
     */
    done();
  });
});
