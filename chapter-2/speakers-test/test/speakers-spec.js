'use strict';

var expect = require('chai').expect;
var unirest = require('unirest');

var SPEAKERS_ALL_URI = 'http://localhost:5000/speakers';


describe('speakers', function() {
  var req;

  beforeEach(function() {
    req = unirest.get(SPEAKERS_ALL_URI)
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

  it('should return all speakers', function(done) {
    req.end(function(res) {
      var speakers = res.body;
      var speaker3 = speakers[2];

      //console.log(speakers);
      //console.log(speaker3);
      expect(speakers.length).to.eql(3);
      expect(speaker3.company).to.eql('Talkola');
      expect(speaker3.firstName).to.eql('Christensen');
      expect(speaker3.lastName).to.eql('Fisher');
      expect(speaker3.tags).to.eql([
        'Java', 'Spring',
        'Maven', 'REST'
      ]);

      done();
    });
  });

});
