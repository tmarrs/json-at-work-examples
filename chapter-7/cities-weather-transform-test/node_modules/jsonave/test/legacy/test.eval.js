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
            "price": [8.95, 8.94]
        },
        "books": [{
            "category": "fiction",
            "author": "Evelyn Waugh",
            "title": "Sword of Honour",
            "price": [10.99, 12.29]
        }, {
            "category": "fiction",
            "author": "Herman Melville",
            "title": "Moby Dick",
            "isbn": "0-553-21311-3",
            "price": [8.99, 6.95]
        }]
    }
};

describe('eval', function () {
    it('multi statement eval', function () {
        var expected = json.store.books[0];
        var selector = '$..[?(' + 'var sum = @.price && @.price[0]+@.price[1];' + 'sum > 20;)]';
        var result = jsonPath({
            json: json,
            path: selector,
            wrap: false
        });
        expect(result).to.deep.equal(expected);
    });

    it('accessing current path', function () {
        var expected = json.store.books[1];
        var result = jsonPath({
            json: json,
            path: "$..[?(@path==\"$['store']['books'][1]\")]",
            wrap: false
        });
        expect(result).to.deep.equal(expected);
    });
});
