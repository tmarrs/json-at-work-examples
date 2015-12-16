"use strict";

var chai = require('chai');

var jsonPath = require('../../index').expression;

var expect = chai.expect;

// tests based on examples at http://goessner.net/articles/JsonPath/

var json = {
    "store": {
        "book": [{
            "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": 8.95
        }, {
            "category": "fiction",
            "author": "Evelyn Waugh",
            "title": "Sword of Honour",
            "price": 12.99
        }, {
            "category": "fiction",
            "author": "Herman Melville",
            "title": "Moby Dick",
            "isbn": "0-553-21311-3",
            "price": 8.99
        }, {
            "category": "fiction",
            "author": "J. R. R. Tolkien",
            "title": "The Lord of the Rings",
            "isbn": "0-395-19395-8",
            "price": 22.99
        }],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
};

describe('goessner example', function () {

    it('wildcards', function () {
        var books = json.store.book;
        var expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        var result = jsonPath({
            json: json,
            path: '$.store.book[*].author'
        });
        expect(result).to.deep.equal(expected);

    });

    it('all properties, entire tree', function () {
        var books = json.store.book;
        var expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        var result = jsonPath({
            json: json,
            path: '$..author'
        });
        expect(result).to.deep.equal(expected);

    });

    it('all sub properties, single level', function () {
        var expected = [json.store.book, json.store.bicycle];
        var result = jsonPath({
            json: json,
            path: '$.store.*'
        });
        expect(result).to.deep.equal(expected);

    });

    it('all sub properties, entire tree', function () {
        var books = json.store.book;
        var expected = [books[0].price, books[1].price, books[2].price, books[3].price, json.store.bicycle.price];
        var result = jsonPath({
            json: json,
            path: '$.store..price'
        });
        expect(result).to.deep.equal(expected);

    });

    it('n property of entire tree', function () {
        var books = json.store.book;
        var expected = [books[2]];
        var result = jsonPath({
            json: json,
            path: '$..book[2]'
        });
        expect(result).to.deep.equal(expected);

    });

    it('last property of entire tree', function () {
        var books = json.store.book;
        var expected = [books[3]];
        var result = jsonPath({
            json: json,
            path: '$..book[(@.length-1)]'
        });
        expect(result).to.deep.equal(expected);

        result = jsonPath({
            json: json,
            path: '$..book[-1:]'
        });
        expect(result).to.deep.equal(expected);

    });

    it('range of property of entire tree', function () {
        var books = json.store.book;
        var expected = [books[0], books[1]];
        var result = jsonPath({
            json: json,
            path: '$..book[0,1]'
        });
        expect(result).to.deep.equal(expected);

        result = jsonPath({
            json: json,
            path: '$..book[:2]'
        });
        expect(result).to.deep.equal(expected);

    });

    it('filter all properties if sub property exists, of entire tree', function () {
        var books = json.store.book;
        var expected = [books[2], books[3]];
        var result = jsonPath({
            json: json,
            path: '$..book[?(@.isbn)]'
        });
        expect(result).to.deep.equal(expected);

    });

    it('filter all properties if sub property greater than of entire tree', function () {
        var books = json.store.book;
        var expected = [books[0], books[2]];
        var result = jsonPath({
            json: json,
            path: '$..book[?(@.price<10)]'
        });
        expect(result).to.deep.equal(expected);

    });

    it('filter all properties if sub property greater than of entire tree (old format)', function () {
        var books = json.store.book;
        var expected = [books[0], books[2]];
        var result = jsonPath(null, json, '$..book[?(@.price<10)]');
        expect(result).to.deep.equal(expected);
    });

    it('all properties of a JSON structure', function () {
        var expected = [
            json.store,
            json.store.book,
            json.store.bicycle,
        ];
        json.store.book.forEach(function (book) {
            expected.push(book);
        });
        json.store.book.forEach(function (book) {
            Object.keys(book).forEach(function (p) {
                expected.push(book[p]);
            });
        });
        expected.push(json.store.bicycle.color);
        expected.push(json.store.bicycle.price);

        var result = jsonPath({
            json: json,
            path: '$..*'
        });
        expect(result).to.deep.equal(expected);
    });
});
