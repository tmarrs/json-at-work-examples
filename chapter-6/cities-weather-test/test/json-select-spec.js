"use strict";

var expect = require('chai').expect;
var jsonSelect = require('JSONSelect');
var unirest = require('unirest');

describe('cities', function() {
	var req;

	beforeEach(function() {
		req = unirest.get('http://localhost:5000/cities')
			.header('Accept', 'application/json');
	});

	it('should return a 200 response', function(done) {
		req.end(function(res) {
			expect(res.statusCode).to.eql(200);
			expect(res.headers['content-type']).to.eql(
				'application/json; charset=utf-8');
			done();
		});
	});

	it('should return the name of the 2nd city', function(done) {
		req.end(function(res) {
			var cities = res.body;
			var secondCityName = null;

			expect(res.statusCode).to.equal(200);
			console.log('\n\n\n\nJSONSelect Test');
			console.log('\nName of the 2nd City: ');
			secondCityName = jsonSelect.match('.name', cities)[1];
			console.log(secondCityName);
			done();
		});
	});

});
