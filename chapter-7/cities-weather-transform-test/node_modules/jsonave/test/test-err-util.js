"use strict";

var chai = require('chai');

var util = require('../lib/err-util');

var expect = chai.expect;

describe('error utility', function () {
    it('no parameters', function () {
        var fn = util.throwErr.bind(null, 'test0');
        expect(fn).to.throw(Error, /test message/);
    });

    it('one parameter', function () {
        var fn = util.throwErr.bind(null, 'test1', 'p0');
        expect(fn).to.throw(Error, /test message param p0/);
    });

    it('two parameters', function () {
        var fn = util.throwErr.bind(null, 'test2', 'p0', 'p1');
        expect(fn).to.throw(Error, /test message param p0 param p1/);
    });

    it('unknown', function () {
        var fn = util.throwErr.bind(null, 'xxxxx');
        expect(fn).to.throw(Error, /Unknown error\./);
    });
});
