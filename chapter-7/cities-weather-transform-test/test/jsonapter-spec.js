var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var j2j = require('jsonapter').instance();

var template = {
	content: {
  	name: {
		  dataTransform: function(input) {
				return input.firstName + ' ' + input.lastName;
			}
	  },
		email: { dataKey: 'email' },
		about: { dataKey: 'about' },		
	}
};

describe('jsonapter', function() {
	describe('run', function() {
		it('should transform JSON', function(done) {
			var jsonFileName = './data/speaker.json';
			
			jsonfile.readFile(jsonFileName, function(err, jsonObj) {
				if (!err) {
					console.log(jsonObj);
					console.log('\n\n\n\jsonapter Test');
					var output = j2j.run(template, jsonObj);
					console.log('\n\n\n\Transformed JSON');
					console.log(JSON.stringify(output));
				}
				done();
			});
		});
	});
});