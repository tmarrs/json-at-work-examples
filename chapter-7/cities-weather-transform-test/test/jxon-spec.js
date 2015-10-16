var expect = require('chai').expect;
var fs = require('fs');
var jsonfile = require('jsonfile');
var jxon = require('jxon');

describe('jxon', function() {
	var jsonFileName = null;

	beforeEach(function() {
		var baseDir = __dirname + '/../../data';

		xmlFileName = baseDir + '/speaker.xml';
	});

	describe('stringToJs', function() {
		it('should transform XML to JSON', function(done) {
			fs.readFile(xmlFileName, 'utf8', function(err, xmlData) {
				if (!err) {
					//console.log('\n\n\n\jxon Test - XML ==> JSON');
					//console.log('\n\n\n\XML');
					//console.log(xmlData);
					var output = jxon.stringToJs(xmlData);
					//console.log('\n\n\n\Transformed JSON');
					//console.log(JSON.stringify(output));
				} else {
					throw (err);
				}

				done();
			});
		});
	});

	describe('jsToString', function() {
		it('should transform JSON to XML', function(done) {
			var jsonFileName = __dirname + '/../../data/speaker.json';

			jsonfile.readFile(jsonFileName, function(err, jsonObj) {
				if (!err) {
					//console.log('\n\n\n\jxon Test - JSON ==> XML');
					//console.log('\n\n\n\JSON');
					//console.log(jsonObj);
					var xml = jxon.jsToString(jsonObj);
					//console.log('\n\n\n\Transformed XML');
					//console.log(xml);
				} else {
					throw (err);
				}

				done();
			});
		});
	});
});
