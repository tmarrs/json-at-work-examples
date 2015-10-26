'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var j2j = require('jsonapter').instance();
var jsonave = require('jsonave').instance;

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

var nameTemplate = {
	content: {
		last: {
			dataKey: 'familyName'
		},
		first: {
			dataKey: 'givenName'
		}
	}
};

var template3 = {
	content: {
		type: 'Report',
		title: function(input) {
			return input.gender === 'M' ? 'Mr.' : 'Ms.';
		},
		name: nameTemplate,
		age: {
			value: function(input) {
				return 2015 - input;
			},
			dataKey: 'birthYear'
		}
	}
};

var weatherTemplate = {
	content: {
		temp: {
			dataKey: 'main.temp'
		},
		description: {
			dataKey: 'weather.0.description'
		}
	}
};

var weatherTemplate2 = {
	content: {
		temp: jsonave('$.main.temp'),
		description: jsonave('$.weather.0.description')
	}
};

var template5 = {
	content: {
		title: "New Report",
		name: jsonave('$.name'),
		weather: weatherTemplate2
	}
};


var cityTemplate = {
	content: {
		name: {
			dataKey: 'name'
		},
		weather: weatherTemplate
	}
};

var template6 = {
	arrayContent: [{
		value: cityTemplate,
		dataKey: jsonave('$.cities[*]')
	}]
}


describe('cities-jsonapter', function() {
	var jsonFileName = null;
	var jsonCitiesFileName = null;
	var jsonCitiesShortFileName = null;
	var jsonCityFileName = null;

	beforeEach(function() {
		var baseDir = __dirname + '/../../data';

		jsonFileName = baseDir + '/speaker.json';
		jsonCitiesFileName = baseDir + '/cities-weather.json';
		jsonCitiesShortFileName = baseDir + '/cities-weather-short.json';
		jsonCityFileName = baseDir + '/city-weather.json';
	});

	it('should transform speaker JSON data', function(done) {
		jsonfile.readFile(jsonFileName, function(err, jsonObj) {
			if (!err) {
				var output = j2j.run(template, jsonObj);
				//console.log('\n\n\n\Transformed JSON');
				//console.log(JSON.stringify(output, null, 2));
			} else {
				throw (err);
			}

			done();
		});
	});

	it('should transform city JSON data', function(done) {
		jsonfile.readFile(jsonCityFileName, function(err, jsonObj) {
			if (!err) {
				var output = j2j.run(template5, jsonObj);
				console.log('\n\n\n\Transformed JSON');
				console.log(JSON.stringify(output, null, 2));
			} else {
				throw (err);
			}

			done();
		});
	});

	it('should transform cities JSON data', function(done) {
		jsonfile.readFile(jsonCitiesFileName, function(err, jsonObj) {
			if (!err) {
				var output = [];
				for (var i in jsonObj['cities']) {
					output.push(j2j.run(template5, jsonObj['cities'][i]));
				}
				//console.log('\n\n\n\Transformed JSON');
				//console.log(JSON.stringify(output, null, 2));
			} else {
				throw (err);
			}

			done();
		});
	});

	it('should transform cities JSON data - Part II', function(done) {
		jsonfile.readFile(jsonCitiesFileName, function(err, jsonObj) {
			if (!err) {
				var output = j2j.run(template6, jsonObj);

				//console.log('\n\n\n\Transformed JSON');
				//console.log(JSON.stringify(output, null, 2));
			} else {
				throw (err);
			}

			done();
		});
	});

	it('should run named template', function(done) {
		var r = j2j.run(template3, {
			familyName: 'DOE',
			givenName: 'JOE',
			gender: 'M',
			birthYear: 1980
		});

		//console.log(r); // {type: 'Report', title: 'Mr.', name: {last: 'DOE', first: 'JOE'}, age: 35}

		done();
	});

});
