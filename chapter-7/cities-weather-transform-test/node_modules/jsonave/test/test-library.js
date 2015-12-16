"use strict";

var chai = require('chai');

var jsonpath = require('../index');

var expect = chai.expect;

var library = require('./examples/library.json');

describe('jsonpath library example', function () {
    var link = library.library.books.reduce(function (r, book) {
        var id = book.id;
        r[id] = book;
        return r;
    }, {});

    var findLinked = function (obj) {
        return link[obj];
    };

    it('predefined functions', function () {
        var jp = jsonpath.instance('$.library.books[0].references[*].findLinked().title', {
            sandbox: {
                findLinked: findLinked
            }
        });

        var actual = jp(library);
        var expected = ["Sword of Honour", "The Lord of the Rings"];
        expect(actual).to.deep.equal(expected);
    });

    it('postdefined functions', function () {
        var jp = jsonpath.instance('library.books[0].references[*].findLinked().title');
        var actual = jp(library, {
            findLinked: findLinked
        });
        var expected = ["Sword of Honour", "The Lord of the Rings"];
        expect(actual).to.deep.equal(expected);
    });

    it('undefined functions', function () {
        var jp = jsonpath.instance('library.books[0].references[*].findLinked().title');
        var jpbinded = jp.bind(null, library);
        expect(jpbinded).to.throw(Error);
    });

    it('root ($) expression in path, array', function () {
        var wrappedLibrary = {
            obj: library,
            link: link
        };

        var jp = jsonpath.instance('$.link[$.obj.library.books[0].references[*]].title');
        var actual = jp(wrappedLibrary);
        var expected = ["Sword of Honour", "The Lord of the Rings"];
        expect(actual).to.deep.equal(expected);
    });

    it('root ($) expression in path, single', function () {
        var wrappedLibrary = {
            obj: library,
            link: link
        };

        var jp = jsonpath.instance('$.link[$.obj.library.books[0].references[0]].title');
        var actual = jp(wrappedLibrary);
        var expected = "Sword of Honour";
        expect(actual).to.deep.equal(expected);
    });

    it('conditional', function () {
        var jp = jsonpath.instance('$.library.books[?(@.id==="SOH")].price', {
            wrap: true
        });

        var actual = jp(library);
        var expected = [12.99];
        expect(actual).to.deep.equal(expected);
    });
});
