"use strict";

var expect = require('chai').expect;
var req = require('request');
var jp = require('jsonpath');
var options = {
  url: 'http://localhost:5000/cities',
  headers: {
    'Accept': 'application/json'
  }
};

describe('cities', function() {
  it('should return a 200 response', function(done) {
    req.get(options, function(err, res, body) {
      expect(res.statusCode).to.eql(200);
      expect(res.headers['content-type']).to.eql(
        'application/json; charset=utf-8');
      done();
    });
  });

  it('should return all cities', function(done) {
    req.get(options, function(err, res, body) {
      expect(res.statusCode).to.eql(200);
      var cities = JSON.parse(res.body);

      //console.log(cities);
      expect(cities.length).to.eql(110);
      done();
    });
  });

  it('should return every other city', function(done) {
    req.get(options, function(err, res, body) {
      expect(res.statusCode).to.eql(200);
      var cities = JSON.parse(res.body);
      var citiesEveryOther = jp.query(cities, '$[0::2]');

      //console.log(citiesEveryOther);
      expect(citiesEveryOther[1].name).to.eql('Rosarito');
      expect(citiesEveryOther.length).to.eql(55);
      done();
    });
  });

  it('should return the last city', function(done) {
    req.get(options, function(err, res, body) {
      expect(res.statusCode).to.eql(200);
      var cities = JSON.parse(res.body);
      var lastCity = jp.query(cities, '$[(@.length-1)]');

      //console.log(lastCity);
      expect(lastCity[0].name).to.eql('Moreno Valley');
      done();
    });
  });

  it('should return 1st 3 cities', function(done) {
    req.get(options, function(err, res, body) {
      expect(res.statusCode).to.eql(200);
      var cities = JSON.parse(res.body);
      var citiesFirstThree = jp.query(cities, '$[:3]');
      var citiesFirstThreeNames = jp.query(cities, '$[:3].name');

      //console.log(citiesFirstThree);
      expect(citiesFirstThree.length).to.eql(3);
      expect(citiesFirstThreeNames).to.eql(['Rancho Palos Verdes',
        'San Pedro', 'Rosarito'
      ]);

      done();
    });
  });

  it('should return cities within a temperature range', function(done) {
    req.get(options, function(err, res, body) {
      expect(res.statusCode).to.eql(200);
      var cities = JSON.parse(res.body);
      var citiesTempRange = jp.query(cities,
        '$[?(@.main.temp >= 84 && @.main.temp <= 85.5)].main.temp'
      );

      //console.log(citiesTempRange);
      for (var i = 0; i < citiesTempRange.length; i++) {
        expect(citiesTempRange[i]).to.be.at.least(84);
        expect(citiesTempRange[i]).to.be.at.most(85.5);
      }

      done();
    });
  });

  it('should return cities with cloudy weather', function(done) {
    req.get(options, function(err, res, body) {
      expect(res.statusCode).to.eql(200);
      var cities = JSON.parse(res.body);
      var citiesCloudy = jp.query(cities,
        '$[?(@.weather[0].main == "Clouds")].weather[0].main'
      );
      var citiesCloudyRegex = jp.query(cities,
        '$[?(@.weather[0].main.match(/Clo/))].weather[0].main'
      );

      //console.log(citiesCloudy);
      for (var i = 0; i < citiesCloudy.length; i++) {
        expect(citiesCloudy[i]).to.eql('Clouds');
      }

      //console.log(citiesCloudyRegex);
      for (var j = 0; j < citiesCloudyRegex.length; j++) {
        expect(citiesCloudyRegex[j]).to.eql('Clouds');
      }

      done();
    });
  });
});
