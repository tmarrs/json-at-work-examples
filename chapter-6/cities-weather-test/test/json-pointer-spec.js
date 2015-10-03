"use strict";

var expect = require('chai').expect;
var pointer = require('json-pointer');
var unirest = require('unirest');

describe('cities-json-pointer', function() {
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

			//console.log('\n\n\n\nJSON Pointer Test');
			//console.log('\n\n1st Object: ');
			//console.log(pointer.get(cities, '/0'));
			//console.log('\nName of the 2nd City: ');
			secondCityName = pointer.get(cities, '/1/name');
			//console.log(secondCityName);
			expect(secondCityName).to.eql("San Pedro");
			done();
		});
	});
});
