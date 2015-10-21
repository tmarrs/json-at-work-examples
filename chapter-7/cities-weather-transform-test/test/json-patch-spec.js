'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var jsonpatch = require('json-patch');

var template = [{
  op: 'add',
  path: '/submittedSlides',
  value: true
}, {
  op: 'remove',
  path: '/tags'
}, {
  op: 'remove',
  path: '/company'
}];

var template2 = [{
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
  path: '/wind'
}, {
  op: 'remove',
  path: '/weather/0/id'
}, {
  op: 'remove',
  path: '/weather/0/main'
}, {
  op: 'remove',
  path: '/weather/0/icon'
}, {
  op: 'move',
  from: '/main/temp',
  path: '/weather/0/temp'
}, {
  op: 'remove',
  path: '/main'
}];

var template3 = [{
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
  path: '/wind'
}, {
  op: 'remove',
  path: '/weather'
}, {
  op: 'remove',
  path: '/main'
}];


describe('cities-json-patch', function() {
  var jsonFileName = null;
  var jsonCitiesFileName = null;

  beforeEach(function() {
    var baseDir = __dirname + '/../../data';

    jsonFileName = baseDir + '/speaker.json';
    jsonCitiesFileName = baseDir + '/cities-weather.json';
  });

  it('should patch JSON', function(done) {
    jsonfile.readFile(jsonFileName, function(err, jsonObj) {
      if (!err) {
        //console.log('\n\n\n\Original JSON');
        //console.log(jsonObj);
        //var output = jsonpatch.apply(jsonObj, template);
        //console.log('\n\n\n\Patched JSON');
        //console.log(JSON.stringify(output));
      } else {
        throw (err);
      }

      done();
    });
  });

  it('should patch cities', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(err, jsonObj) {
      if (!err) {
        //console.log('\n\n\n\Original JSON');
        //console.log(jsonObj);
        var output = [];
        //var output = jsonpatch.apply(jsonObj, template2);
        //console.log(jsonObj);
        //console.log(typeof jsonObj);
        //console.log('\n\n\n\Patched JSON');
        //console.log(JSON.stringify(output, null, 2));
        var length = 0;
        for (var i in jsonObj['cities']) {
          length++;
          output.push(jsonpatch.apply(jsonObj['cities'][i],
            template3));
          //console.log(jsonObj['cities'][i]);
        }

        //console.log(length);
        //console.log(typeof jsonObj['cities']);
        //console.log(JSON.stringify(output, null, 2));
      } else {
        throw (err);
      }

      done();
    });
  });
});
