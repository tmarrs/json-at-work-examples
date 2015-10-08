"use strict";

var expect = require('chai').expect;
var unirest = require('unirest');
var rqlQuery = require("rql/query").Query;

describe('cities-rql', function() {
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

  it('should return all cities', function(done) {
    req.end(function(res) {
      var cities = res.body;

      //console.log(cities);
      expect(cities.length).to.eql(110);
      done();
    });
  });
  /*
    it('should return every other city', function(done) {
      req.end(function(res) {
        var cities = res.body;
        var citiesEveryOther = jp.query(cities, '$[0::2]');

        //console.log(citiesEveryOther);
        expect(citiesEveryOther[1].name).to.eql('Rosarito');
        expect(citiesEveryOther.length).to.eql(55);
        done();
      });
    });
  */
});
