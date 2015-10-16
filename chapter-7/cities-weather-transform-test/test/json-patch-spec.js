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

describe('json-patch', function() {
  var jsonFileName = null;

  beforeEach(function() {
    var baseDir = __dirname + '/../../data';

    jsonFileName = baseDir + '/speaker.json';
  });

  describe('apply', function() {
    it('should patch JSON', function(done) {
      jsonfile.readFile(jsonFileName, function(err, jsonObj) {
        if (!err) {
          console.log('\n\n\n\Original JSON');
          console.log(jsonObj);
          console.log('\n\n\n\JSONPatch Test');
          var output = jsonpatch.apply(jsonObj, template);
          console.log('\n\n\n\Patched JSON');
          console.log(JSON.stringify(output));
        } else {
          throw (err);
        }

        done();
      });
    });
  });
});
