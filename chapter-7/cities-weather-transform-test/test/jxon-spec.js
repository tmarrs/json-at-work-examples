var expect = require('chai').expect;
var fs = require('fs');
var jxon = require('jxon');
var jsonfile = require('jsonfile');

describe('jxon', function() {
	describe('stringToJs', function() {
		it('should transform XML to JSON', function(done) {
			var xmlFileName = './data/speaker.xml';
			
			fs.readFile(xmlFileName, 'utf8', function (err, xmlData) {
  			if (!err) {
					console.log('\n\n\n\jxon Test - XML ==> JSON');
					console.log('\n\n\n\XML');
  				console.log(xmlData);
					var output = jxon.stringToJs(xmlData);
					console.log('\n\n\n\Transformed JSON');
					console.log(JSON.stringify(output));
				}
				done();
			});
		});
	});

	describe('jsToString', function() {
		it('should transform JSON to XML', function(done) {
			var jsonFileName = './data/speaker.json';
			
			jsonfile.readFile(jsonFileName, function(err, jsonObj) {
  			if (!err) {
					console.log('\n\n\n\jxon Test - JSON ==> XML');
					console.log('\n\n\n\JSON');
  				console.log(jsonObj);
					var xml = jxon.jsToString(jsonObj);
					console.log('\n\n\n\Transformed XML');
					console.log(xml);
				}
				done();
			});
		});
	});
});