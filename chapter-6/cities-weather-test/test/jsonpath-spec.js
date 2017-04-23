'use strict';

/* Attribution: Cities Weather data provided by OpenWeatherMap API 
   ([http://openweathermap.org]) under Creative Commons Share A Like 
   License (https://creativecommons.org/licenses/by-sa/4.0).
   Changes were made to the data to work with json-server.
   This does not imply an endorsement by the licensor.
   
   This code is distributed under Creative Commons Share A Like License.
*/

var expect = require('chai').expect;
var jp = require('jsonpath');
var unirest = require('unirest');

describe('cities-jsonpath', function() {
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

  it('should return the last city', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var lastCity = jp.query(cities, '$[(@.length-1)]');

      //console.log(lastCity);
      expect(lastCity[0].name).to.eql('Moreno Valley');
      done();
    });
  });

  it('should return the 1st 3 cities', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesFirstThree = jp.query(cities, '$[:3]');
      var citiesFirstThreeNames = jp.query(cities, '$[:3].name');

      //console.log(citiesFirstThree);
      //console.log(citiesFirstThreeNames);
      expect(citiesFirstThree.length).to.eql(3);
      expect(citiesFirstThreeNames.length).to.eql(3);
      expect(citiesFirstThreeNames).to.eql(['Rancho Palos Verdes',
        'San Pedro', 'Rosarito'
      ]);

      done();
    });
  });

  it('should return cities within a temperature range', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesTempRange = jp.query(cities,
        '$[?(@.main.temp >= 84 && @.main.temp <= 85.5)]'
      );

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
      var citiesWeatherCloudy = jp.query(cities,
        '$[?(@.weather[0].main == "Clouds")]'
      );

      checkCitiesWeather(citiesWeatherCloudy);
      done();
    });
  });

  it('should return cities with cloudy weather using regex', function(done) {
    req.end(function(res) {
      var cities = res.body;
      var citiesWeatherCloudyRegex = jp.query(cities,
        '$[?(@.weather[0].main.match(/Clo/))]'
      );

      checkCitiesWeather(citiesWeatherCloudyRegex);
      done();
    });
  });

  function checkCitiesWeather(cities) {
    //console.log(cities);
    for (var i = 0; i < cities.length; i++) {
      expect(cities[i].weather[0].main).to.eql('Clouds');
    }
  }
});
