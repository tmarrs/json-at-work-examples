'use strict';

/* Attribution: Cities Weather data provided by OpenWeatherMap API 
   ([http://openweathermap.org]) under Creative Commons Share A Like 
   License (https://creativecommons.org/licenses/by-sa/4.0).
   Changes were made to the data to work with json-server.
   This does not imply an endorsement by the licensor.
   
   This code is distributed under Creative Commons Share A Like License.
*/

var expect = require('chai').expect;
var jq = require('node-jq');
var unirest = require('unirest');
var _ = require('underscore');


describe('cities-jq', function() {
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

  it('should return the last city', function(done) {
    req.end(function(res) {
      var cities = res.body;

      jq.run('.[-1]', cities, {
          input: 'json'
        })
        .then(function(lastCityJson) { // Returns JSON String.
          //console.log(lastCityJson);
          var lastCity = JSON.parse(lastCityJson);
          expect(lastCity.name).to.eql('Moreno Valley');
          done();
        })
        .catch(function(error) {
          console.error(error);
          done(error);
        });
    });
  });

  it('should return the 1st 3 cities', function(done) {
    req.end(function(res) {
      var cities = res.body;

      jq.run('.[:3]', cities, {
          input: 'json'
        })
        .then(function(citiesFirstThreeJson) { // Returns JSON String.
          //console.log(citiesFirstThreeJson);
          var citiesFirstThree = JSON.parse(citiesFirstThreeJson);
          var citiesFirstThreeNames = getCityNamesOnly(
            citiesFirstThree);

          //console.log(citiesFirstThree);
          //console.log(citiesFirstThreeNames);
          expect(citiesFirstThree.length).to.eql(3);
          expect(citiesFirstThreeNames.length).to.eql(3);
          expect(citiesFirstThreeNames).to.eql([
            'Rancho Palos Verdes',
            'San Pedro', 'Rosarito'
          ]);

          done();
        })
        .catch(function(error) {
          console.error(error);
          done(error);
        });
    });
  });

  function getCityNamesOnly(cities) {
    return _.map(cities,
      function(city) {
        return city.name;
      });
  }

  it('should return cities within a temperature range', function(done) {
    req.end(function(res) {
      var cities = res.body;

      jq.run(
          '[.[] | select (.main.temp >= 84 and .main.temp <= 85.5)]',
          cities, {
            input: 'json'
          })
        .then(function(citiesTempRangeJson) { // Returns JSON String.
          //console.log(citiesTempRangeJson);
          var citiesTempRange = JSON.parse(citiesTempRangeJson);

          //console.log(citiesTempRange);
          for (var i = 0; i < citiesTempRange.length; i++) {
            expect(citiesTempRange[i].main.temp).to.be.at.least(
              84);
            expect(citiesTempRange[i].main.temp).to.be.at.most(
              85.5);
          }

          done();
        })
        .catch(function(error) {
          console.error(error);
          done(error);
        });
    });
  });

  it('should return cities with cloudy weather', function(done) {
    req.end(function(res) {
      var cities = res.body;

      jq.run(
          '[.[] | select(.weather[0].main == "Clouds")]',
          cities, {
            input: 'json'
          })
        .then(function(citiesWeatherCloudyJson) { // Returns JSON String.
          //console.log(citiesWeatherCloudyJson);
          var citiesWeatherCloudy = JSON.parse(
            citiesWeatherCloudyJson);

          //console.log(citiesWeatherCloudy);
          checkCitiesWeather(citiesWeatherCloudy);

          done();
        })
        .catch(function(error) {
          console.error(error);
          done(error);
        });
    });
  });

  it('should return cities with cloudy weather using regex', function(done) {
    req.end(function(res) {
      var cities = res.body;

      jq.run(
          '[.[] | select(.weather[0].main | test("^Clo"; "i"))]',
          cities, {
            input: 'json'
          })
        .then(function(citiesWeatherCloudyJson) { // Returns JSON String.
          //console.log(citiesWeatherCloudyJson);
          var citiesWeatherCloudy = JSON.parse(
            citiesWeatherCloudyJson);

          //console.log(citiesWeatherCloudy);
          checkCitiesWeather(citiesWeatherCloudy);

          done();
        })
        .catch(function(error) {
          console.error(error);
          done(error);
        });
    });
  });

  function checkCitiesWeather(cities) {
    //console.log(cities);
    for (var i = 0; i < cities.length; i++) {
      expect(cities[i].weather[0].main).to.eql('Clouds');
    }
  }

});
