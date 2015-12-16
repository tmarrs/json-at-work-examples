"use strict";

var chai = require('chai');

var jsonPath = require('../../index').expression;

var expect = chai.expect;

var json = {
    "store": {
        "book": {
            "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": [8.95, 8.94, 8.93]
        },
        "books": [{
            "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": [8.95, 8.94, 8.93]
        }]
    }
};

describe('array test', function () {
    it('get single', function () {
        var expected = json.store.book;
        var result = jsonPath({
            json: json,
            path: 'store.book',
            flatten: true,
            wrap: false
        });
        expect(result).to.deep.equal(expected);
    });

    it('get array', function () {
        var expected = json.store.books;
        var result = jsonPath({
            json: json,
            path: 'store.books',
            flatten: true,
            wrap: false
        });
        expect(result).to.deep.equal(expected);
    });
});
