var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var jsonpatch = require('json-patch');

var template = [
  { op: 'add', path: '/submittedSlides', value: true },
	{ op: 'remove', path: '/tags' },
	{ op: 'remove', path: '/company' }
];

describe('json-patch', function() {
	describe('apply', function() {
		it('should patch JSON', function(done) {
			var jsonFileName = './data/speaker.json';
      
      jsonfile.readFile(jsonFileName, function(err, jsonObj) {
        if (!err) {
    			console.log('\n\n\n\Original JSON');
          console.log(jsonObj);
          console.log('\n\n\n\JSONPatch Test');
    			var output = jsonpatch.apply(jsonObj, template);
    			console.log('\n\n\n\Patched JSON');
    			console.log(JSON.stringify(output));
        }
  			done();
      });
		});
	});
});