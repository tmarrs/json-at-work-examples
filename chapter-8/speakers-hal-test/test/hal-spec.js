'use strict';

var expect = require('chai').expect;
var unirest = require('unirest');
var halfred = require('halfred');

describe('speakers-hal', function() {
  var req;

  beforeEach(function() {
    halfred.enableValidation();
    req = unirest.get('http://localhost:5000/speakers')
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

  it('should return the HAL response - halfred', function(done) {
    req.end(function(res) {
      var speakers = res.body;

      // console.log(speakers);

      var resource = halfred.parse(speakers);
      console.log(resource);
      console.log('\nLinks: ')
      console.log(resource.allLinks());
      console.log('\nValidation Issues: ');
      console.log(resource.validationIssues());
      done();
    });
  });
});
