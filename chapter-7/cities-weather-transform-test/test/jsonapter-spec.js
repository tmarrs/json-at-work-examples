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
		email: {
			dataKey: 'email'
		},
		about: {
			dataKey: 'about'
		},
	}
};

var template2 = {
	content: {
		name: 'name',
		id: 'id',
		weather: {
			temp: {
				dataKey: 'main.temp'
			}
		}
	}
};

describe('cities-jsonapter', function() {
	var jsonFileName = null;
	var jsonCitiesFileName = null;

	beforeEach(function() {
		var baseDir = __dirname + '/../../data';

		jsonFileName = baseDir + '/speaker.json';
		jsonCitiesFileName = baseDir + '/cities-weather.json';
	});

	it('should transform JSON', function(done) {
		jsonfile.readFile(jsonFileName, function(err, jsonObj) {
			if (!err) {
				console.log(jsonObj);
				console.log('\n\n\n\jsonapter Test');
				var output = j2j.run(template, jsonObj);
				console.log('\n\n\n\Transformed JSON');
				console.log(JSON.stringify(output));
			} else {
				throw (err);
			}

			done();
		});
	});

	it('should transform cities JSON data', function(done) {
		jsonfile.readFile(jsonCitiesFileName, function(err, jsonObj) {
			if (!err) {
				//console.log(jsonObj);
				//console.log('\n\n\n\jsonapter Test');
				var output = j2j.run(template2, jsonObj);
				//console.log('\n\n\n\Transformed JSON');
				//console.log(JSON.stringify(output));
			} else {
				throw (err);
			}

			done();
		});
	});
});
