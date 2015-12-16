"use strict";

var chai = require('chai');

var jsonPath = require('../../index').expression;

var expect = chai.expect;

var t1 = {
    simpleString: "simpleString",
    "@": "@asPropertyName",
    "a$a": "$inPropertyName",
    "$": {
        "@": "withboth",
    },
    a: {
        b: {
            c: "food"
        }
    }
};

describe('@ and $ test', function () {
    it('undefined, null', function () {
        expect(jsonPath({
            json: undefined,
            path: 'foo'
        })).to.equal(undefined);
        expect(jsonPath({
            json: null,
            path: 'foo'
        })).to.equal(null);
        expect(jsonPath({
            json: {},
            path: 'foo'
        })[0]).to.deep.equal(undefined);
        expect(jsonPath({
            json: {
                a: 'b'
            },
            path: 'foo'
        })[0]).to.deep.equal(undefined);
        expect(jsonPath({
            json: {
                a: 'b'
            },
            path: 'foo'
        })[100]).to.deep.equal(undefined);
    });

    it('actual', function () {
        expect(jsonPath({
            json: t1,
            path: '\$'
        })[0]).to.deep.equal(t1['$']);
        expect(jsonPath({
            json: t1,
            path: '$'
        })[0]).to.deep.equal(t1['$']);
        expect(jsonPath({
            json: t1,
            path: 'a$a'
        })[0]).to.deep.equal(t1['a$a']);
        expect(jsonPath({
            json: t1,
            path: '\@'
        })[0]).to.deep.equal(t1['@']);
        expect(jsonPath({
            json: t1,
            path: '@'
        })[0]).to.deep.equal(t1['@']);
        expect(jsonPath({
            json: t1,
            path: '$.$.@'
        })[0]).to.deep.equal(t1['$']['@']);
        expect(jsonPath({
            json: t1,
            path: '\@'
        })[1]).to.equal(undefined);
    });
});
