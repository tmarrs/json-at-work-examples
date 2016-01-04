'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var jsonpatch = require('json-patch');

var citiesTemplate = [{
  op: 'remove',
  path: '/coord'
}, {
  op: 'remove',
  path: '/dt'
}, {
  op: 'remove',
  path: '/clouds'
}, {
  op: 'remove',
  path: '/weather/0/id'
}, {
  op: 'remove',
  path: '/weather/0/icon'
}, {
  op: 'move',
  from: '/main/temp',
  path: '/weather/0/currentTemp'
}, {
  op: 'move',
  from: '/main/temp_min',
  path: '/weather/0/lowTemp'
}, {
  op: 'move',
  from: '/main/temp_max',
  path: '/weather/0/hiTemp'
}, {
  op: 'move',
  from: '/main/humidity',
  path: '/weather/0/humidity'
}, {
  op: 'move',
  from: '/weather/0/main',
  path: '/weather/0/summary'
}, {
  op: 'move',
  from: '/wind/speed',
  path: '/weather/0/windSpeed'
}, {
  op: 'remove',
  path: '/main'
}, {
  op: 'remove',
  path: '/wind'
}];

describe('cities-json-patch', function() {
  var jsonFileName = null;
  var jsonCitiesFileName = null;

  beforeEach(function() {
    var baseDir = __dirname + '/../../data';

    jsonCitiesFileName = baseDir + '/cities-weather-short.json';
  });

  it('should patch all cities - fail', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(fileReadError,
      jsonObj) {
      if (!fileReadError) {
        try {
          var output = jsonpatch.apply(jsonObj, citiesTemplate);

          console.log('\n\n\n\Original JSON');
          console.log(jsonObj);
          console.log('\n\n\n\Patched JSON');
          console.log(JSON.stringify(output, null, 2));
          done();
        } catch (transformError) {
          expect(transformError).to.be.an.instanceof(Object);
          expect(transformError.name).to.eql('PatchConflictError');
          done();
        }
      } else {
        console.error(fileReadError);
        done(fileReadError);
      }
    });
  });

  it('should patch all cities - success (kind of)', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(fileReadError,
      jsonObj) {
      if (!fileReadError) {
        try {
          console.log('\n\n\n\Original JSON');
          console.log(jsonObj);
          var output = [];

          for (var i in jsonObj['cities']) {
            output.push(jsonpatch.apply(jsonObj['cities'][i],
              citiesTemplate));
          }

          console.log('\n\n\n\Patched JSON');
          console.log(JSON.stringify(output, null, 2));
          done();
        } catch (transformError) {
          console.error(transformError);
          done(transformError);
        }
      } else {
        console.error(fileReadError);
        done(fileReadError);
      }
    });
  });

});
