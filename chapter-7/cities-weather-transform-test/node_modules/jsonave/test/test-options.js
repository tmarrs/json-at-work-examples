"use strict";

var chai = require('chai');

var jsonpath = require('../index');

var expect = chai.expect;

var store = require('./examples/store.json');

describe('jsonpath options', function () {
    it('flatten', function () {
        var jp = jsonpath.instance('$.store[*]', {
            flatten: true
        });
        var actual = jp(store);
        var expected = store.store.book.slice();
        expected.push(store.store.bicycle);

        expect(actual).to.deep.equal(expected);
    });

    it('no input expression', function () {
        var fn = function () {
            return jsonpath.instance();
        };
        expect(fn).to.throw(Error);
    });

    it('unknown resultType', function () {
        var fn = function () {
            return jsonpath.instance('$.store[*]', {
                flatten: true,
                resultType: 'something'
            });
        };
        expect(fn).to.throw(Error);
    });
});
