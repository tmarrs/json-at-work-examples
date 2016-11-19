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

  it('should return a valid HAL response validated by halfred', function(
    done) {
    req.end(function(res) {
      var speakersHALResponse = res.body;

      var resource = halfred.parse(speakersHALResponse);
      var speakers = resource.speakers;
      var speaker1 = null;
      console.log('\nValidation Issues: ');
      console.log(resource.validationIssues());
      expect(resource.validationIssues()).to.be.empty;
      console.log(resource);
      console.log('\nLinks: ')
      console.log(resource.allLinks());
      console.log('\nSpeakers Array: ');
      console.log(speakers);
      expect(speakers).to.not.be.null;
      expect(speakers).to.not.be.empty;
      speaker1 = speakers[0];
      expect(speaker1.firstName).to.not.be.null;
      expect(speaker1.firstName).to.eql('Larson');
      done();
    });
  });
});
