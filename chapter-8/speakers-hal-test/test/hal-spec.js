'use strict';

var expect = require('chai').expect;
var unirest = require('unirest');

describe('speakers-hal', function() {
  var req;

  beforeEach(function() {
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

  it('should return all speakers', function(done) {
    req.end(function(res) {
      var speakers = res.body;

      console.log(speakers);
      done();
    });
  });

});
