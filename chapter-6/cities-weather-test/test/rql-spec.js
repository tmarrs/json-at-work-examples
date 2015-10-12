"use strict";

var expect = require('chai').expect;
var unirest = require('unirest');
var rqlQuery = require("rql/js-array");

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

  it('should return the # of cities', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesCount = rqlQuery.executeQuery(
        '&count()', {},
        cities);

      //console.log(citiesCount);
      expect(citiesCount).to.eql(110);
      done();
    });
  });

  it('should return the last city', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesCount = rqlQuery.executeQuery(
        '&count()', {},
        cities);
      var lastCityQuery = '&limit(1,' + (citiesCount - 1) +
        ',1)';
      var lastCity = rqlQuery.executeQuery(lastCityQuery, {},
        cities);

      //console.log(lastCity);
      expect(lastCity[0].name).to.eql('Moreno Valley');
      done();
    });
  });

  it('should return the 1st 3 cities', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesFirstThree = rqlQuery.executeQuery(
        '&limit(3,0,3)', {},
        cities);

      var citiesFirstThreeNames = rqlQuery.executeQuery(
        '&select(name)&values(name)&limit(3,0,3)', {},
        cities);

      var firstThreeNames = [];

      //console.log(citiesFirstThree);
      //console.log(citiesFirstThreeNames);
      expect(citiesFirstThree.length).to.eql(3);
      expect(citiesFirstThreeNames.length).to.eql(3);
      for (var i = 0; i < citiesFirstThreeNames.length; ++i) {
        //console.log(citiesFirstThreeNames[i]);
        firstThreeNames.push(citiesFirstThreeNames[i]);
      }

      //console.log(firstThreeNames);
      expect(firstThreeNames).to.eql([
        'Rancho Palos Verdes',
        'San Pedro', 'Rosarito'
      ]);

      done();
    });
  });

  it('should return cities within a temperature range', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesTempRange = rqlQuery.executeQuery(
        '&ge(main/temp,84)&le(main/temp,85.5)', {},
        cities);

      //console.log(citiesTempRange);
      for (var i = 0; i < citiesTempRange.length; i++) {
        expect(citiesTempRange[i].main.temp).to.be.at.least(84);
        expect(citiesTempRange[i].main.temp).to.be.at.most(85.5);
      }

      done();
    });
  });

  it('should return cities with cloudy weather', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesWeatherCloudy = rqlQuery.executeQuery(
        "weather/0/main=Clouds", {},
        cities);

      for (var i = 0; i < citiesWeatherCloudy.length; i++) {
        for (var j = 0; j < citiesWeatherCloudy[i].weather.length;
          ++j) {
          //console.log(citiesWeatherCloudy[i].weather[j].main);
          expect(citiesWeatherCloudy[i].weather[j].main).to.eql(
            'Clouds');
        }
      }
      done();
    });
  });
});
