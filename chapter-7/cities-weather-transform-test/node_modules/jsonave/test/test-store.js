"use strict";

var chai = require('chai');

var jsonpath = require('../index');

var expect = chai.expect;

var store = require('./examples/store.json');

describe('jsonpath store example default options', function () {
    it('$.store.book[*].author', function () {
        var jp = jsonpath.instance('$.store.book[*].author');
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.author;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$..author', function () {
        var jp = jsonpath.instance('$..author');
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.author;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.*', function () {
        var jp = jsonpath.instance('$.store.*');
        var actual = jp(store);
        var expected = [store.store.book, store.store.bicycle];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price', function () {
        var jp = jsonpath.instance('$.store..price');
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.price;
        });
        expected.push(store.store.bicycle.price);
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[2]', function () {
        var jp = jsonpath.instance('$..book[2]');
        var actual = jp(store);
        var expected = [store.store.book[2]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[(@.length-1)]', function () {
        var jp = jsonpath.instance('$..book[(@.length-1)]');
        var actual = jp(store);
        var expected = [store.store.book[3]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[-1:]', function () {
        var jp = jsonpath.instance('$..book[-1:]');
        var actual = jp(store);
        var expected = [store.store.book[3]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[1,2]', function () {
        var jp = jsonpath.instance('$..book[1,2]');
        var actual = jp(store);
        var expected = [store.store.book[1], store.store.book[2]];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].price', function () {
        var jp = jsonpath.instance('$.store.book[1].price');
        var actual = jp(store);
        var expected = store.store.book[1].price;
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[:2]', function () {
        var jp = jsonpath.instance('$..book[:2]');
        var actual = jp(store);
        var expected = [store.store.book[0], store.store.book[1]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[1:]', function () {
        var jp = jsonpath.instance('$..book[1:].price');
        var actual = jp(store);
        var expected = [store.store.book[1].price, store.store.book[2].price, store.store.book[3].price];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[-2].price', function () {
        var jp = jsonpath.instance('$.store.book[-2].price');
        var actual = jp(store);
        var expected = 8.99;
        expect(actual).to.equal(expected);
    });

    it('$.store.book[-2,-1].price', function () {
        var jp = jsonpath.instance('$.store.book[-2,-1]');
        var actual = jp(store);
        var expected = [store.store.book[2], store.store.book[3]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[*][category,author]', function () {
        var jp = jsonpath.instance('$..book[*][category,author]');
        var actual = jp(store);
        var expected = store.store.book.reduce(function (r, book) {
            r.push(book.category);
            r.push(book.author);
            return r;
        }, []);
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[?(@.isbn)]', function () {
        var jp = jsonpath.instance('$..book[?(@.isbn)]');
        var actual = jp(store);
        var expected = store.store.book.filter(function (book) {
            return book.isbn;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$..[?(@.price>19)]^', function () {
        var jp = jsonpath.instance('$..[?(@.price>19)]^');
        var actual = jp(store);
        var expected = [store.store, store.store.book];
        expect(actual).to.deep.equal(expected);
    });

    it('$..*', function () {
        var jp = jsonpath.instance('$..*');
        var actual = jp(store);
        var expected = [store.store, store.store.book, store.store.bicycle];
        store.store.book.forEach(function (book) {
            expected.push(book);
        });
        store.store.book.forEach(function (book) {
            Object.keys(book).forEach(function (key) {
                expected.push(book[key]);
            });
        });
        expected.push(store.store.bicycle.color);
        expected.push(store.store.bicycle.price);
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]', function () {
        var jp = jsonpath.instance('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]');
        var actual = jp(store);
        var expected = store.store.book.slice(1);
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price.round()', function () {
        var opts = {
            sandbox: {
                round: function (obj) {
                    return Math.round(obj);
                }
            }
        };
        var jp = jsonpath.instance('$.store..price.round()', opts);
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return Math.round(book.price);
        });
        expected.push(Math.round(store.store.bicycle.price));
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price.round', function () {
        var jp = jsonpath.instance('$.store..price.round');
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].pricex', function () {
        var jp = jsonpath.instance('$.store.book[1].pricex');
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].pricex', function () {
        var jp = jsonpath.instance('store.book[*].pricex');
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].price[*]', function () {
        var jp = jsonpath.instance('store.book[*].price[*]');
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });
});

describe('jsonpath store example wrap=true', function () {
    var opts = {
        wrap: true
    };

    it('$.store.book[*].author', function () {
        var jp = jsonpath.instance('$.store.book[*].author');
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.author;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$..author', function () {
        var jp = jsonpath.instance('$..author');
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.author;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.*', function () {
        var jp = jsonpath.instance('$.store.*');
        var actual = jp(store);
        var expected = [store.store.book, store.store.bicycle];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price', function () {
        var jp = jsonpath.instance('$.store..price');
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.price;
        });
        expected.push(store.store.bicycle.price);
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[2]', function () {
        var jp = jsonpath.instance('$..book[2]');
        var actual = jp(store);
        var expected = [store.store.book[2]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[(@.length-1)]', function () {
        var jp = jsonpath.instance('$..book[(@.length-1)]');
        var actual = jp(store);
        var expected = [store.store.book[3]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[-1:]', function () {
        var jp = jsonpath.instance('$..book[-1:]');
        var actual = jp(store);
        var expected = [store.store.book[3]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[1,2]', function () {
        var jp = jsonpath.instance('$..book[1,2]');
        var actual = jp(store);
        var expected = [store.store.book[1], store.store.book[2]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[:2]', function () {
        var jp = jsonpath.instance('$..book[:2]');
        var actual = jp(store);
        var expected = [store.store.book[0], store.store.book[1]];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].price', function () {
        var jp = jsonpath.instance('$.store.book[1].price', opts);
        var actual = jp(store);
        var expected = [store.store.book[1].price];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[*][category,author]', function () {
        var jp = jsonpath.instance('$..book[*][category,author]');
        var actual = jp(store);
        var expected = store.store.book.reduce(function (r, book) {
            r.push(book.category);
            r.push(book.author);
            return r;
        }, []);
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[?(@.isbn)]', function () {
        var jp = jsonpath.instance('$..book[?(@.isbn)]');
        var actual = jp(store);
        var expected = store.store.book.filter(function (book) {
            return book.isbn;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$..[?(@.price>19)]^', function () {
        var jp = jsonpath.instance('$..[?(@.price>19)]^');
        var actual = jp(store);
        var expected = [store.store, store.store.book];
        expect(actual).to.deep.equal(expected);
    });

    it('$..*', function () {
        var jp = jsonpath.instance('$..*');
        var actual = jp(store);
        var expected = [store.store, store.store.book, store.store.bicycle];
        store.store.book.forEach(function (book) {
            expected.push(book);
        });
        store.store.book.forEach(function (book) {
            Object.keys(book).forEach(function (key) {
                expected.push(book[key]);
            });
        });
        expected.push(store.store.bicycle.color);
        expected.push(store.store.bicycle.price);
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]', function () {
        var jp = jsonpath.instance('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]');
        var actual = jp(store);
        var expected = store.store.book.slice(1);
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price.round()', function () {
        var opts = {
            sandbox: {
                round: function (obj) {
                    return Math.round(obj);
                }
            }
        };
        var jp = jsonpath.instance('$.store..price.round()', opts);
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return Math.round(book.price);
        });
        expected.push(Math.round(store.store.bicycle.price));
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].pricex', function () {
        var jp = jsonpath.instance('$.store.book[1].pricex', opts);
        var actual = jp(store);
        var expected = [];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[*].pricex', function () {
        var jp = jsonpath.instance('$.store.book[*].pricex', opts);
        var actual = jp(store);
        var expected = [];
        expect(actual).to.deep.equal(expected);
    });
});

describe('jsonpath store example wrap=false', function () {
    var opts = {
        wrap: false
    };

    it('$.store.book[*].author', function () {
        var jp = jsonpath.instance('$.store.book[*].author', opts);
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.author;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$..author', function () {
        var jp = jsonpath.instance('$..author', opts);
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.author;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.*', function () {
        var jp = jsonpath.instance('$.store.*', opts);
        var actual = jp(store);
        var expected = [store.store.book, store.store.bicycle];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price', function () {
        var jp = jsonpath.instance('$.store..price', opts);
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return book.price;
        });
        expected.push(store.store.bicycle.price);
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[2]', function () {
        var jp = jsonpath.instance('$..book[2]', opts);
        var actual = jp(store);
        var expected = store.store.book[2];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[(@.length-1)]', function () {
        var jp = jsonpath.instance('$..book[(@.length-1)]', opts);
        var actual = jp(store);
        var expected = store.store.book[3];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[-1:]', function () {
        var jp = jsonpath.instance('$..book[-1:]', opts);
        var actual = jp(store);
        var expected = store.store.book[3];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[1,2]', function () {
        var jp = jsonpath.instance('$..book[1,2]', opts);
        var actual = jp(store);
        var expected = [store.store.book[1], store.store.book[2]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[0:6:2]', function () {
        var jp = jsonpath.instance('$..book[0:6:2]', opts);
        var actual = jp(store);
        var expected = [store.store.book[0], store.store.book[2]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[2:-1]', function () {
        var jp = jsonpath.instance('$..book[1:-1]', opts);
        var actual = jp(store);
        var expected = [store.store.book[1], store.store.book[2]];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[1,2]', function () {
        var jp = jsonpath.instance('$..book[1,2]', opts);
        var actual = jp(null);
        expect(actual).to.equal(null);
    });

    it('$..book[:2]', function () {
        var jp = jsonpath.instance('$..book[:2]', opts);
        var actual = jp(store);
        var expected = [store.store.book[0], store.store.book[1]];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].price', function () {
        var jp = jsonpath.instance('$.store.book[1].price', opts);
        var actual = jp(store);
        var expected = store.store.book[1].price;
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[*][category,author]', function () {
        var jp = jsonpath.instance('$..book[*][category,author]', opts);
        var actual = jp(store);
        var expected = store.store.book.reduce(function (r, book) {
            r.push(book.category);
            r.push(book.author);
            return r;
        }, []);
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[?(@.isbn)]', function () {
        var jp = jsonpath.instance('$..book[?(@.isbn)]', opts);
        var actual = jp(store);
        var expected = store.store.book.filter(function (book) {
            return book.isbn;
        });
        expect(actual).to.deep.equal(expected);
    });

    it('$..[?(@.price>19)]^', function () {
        var jp = jsonpath.instance('$..[?(@.price>19)]^', opts);
        var actual = jp(store);
        var expected = [store.store, store.store.book];
        expect(actual).to.deep.equal(expected);
    });

    it('$..*', function () {
        var jp = jsonpath.instance('$..*', opts);
        var actual = jp(store);
        var expected = [store.store, store.store.book, store.store.bicycle];
        store.store.book.forEach(function (book) {
            expected.push(book);
        });
        store.store.book.forEach(function (book) {
            Object.keys(book).forEach(function (key) {
                expected.push(book[key]);
            });
        });
        expected.push(store.store.bicycle.color);
        expected.push(store.store.bicycle.price);
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]', function () {
        var jp = jsonpath.instance('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]', opts);
        var actual = jp(store);
        var expected = store.store.book.slice(1);
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price.round()', function () {
        var opts = {
            wrap: false,
            sandbox: {
                round: function (obj) {
                    return Math.round(obj);
                }
            }
        };
        var jp = jsonpath.instance('$.store..price.round()', opts, opts);
        var actual = jp(store);
        var expected = store.store.book.map(function (book) {
            return Math.round(book.price);
        });
        expected.push(Math.round(store.store.bicycle.price));
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].pricex', function () {
        var jp = jsonpath.instance('$.store.book[1].pricex', opts);
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[*].pricex', function () {
        var jp = jsonpath.instance('$.store.book[*].pricex', opts);
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].price[?(@nothing>0)]', function () {
        var jp = jsonpath.instance('$.store.book[1].price[?(@nothing>0)]', opts);
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[1].price..', function () {
        var jp = jsonpath.instance('$.store.book[1].price..', opts);
        var actual = jp(store);
        expect(actual).to.equal(12.99);
    });

    it('$.store.book[$.nothing]', function () {
        var jp = jsonpath.instance('$.store.book[$.nothing]', opts);
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.book[(*dsdsd*--44)]', function () {
        var jp = jsonpath.instance('$.store.book[(*dsdsd*--44)]');
        var jpbind = jp.bind(null, store);
        expect(jpbind).to.throw(Error);
    });

    it('$.store.book[1]^^^^', function () {
        var jp = jsonpath.instance('$.store.book[1]^^^^', opts);
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });

    it('$', function () {
        var jp = jsonpath.instance('$', opts);
        var actual = jp(store);
        var expected = null;
        expect(actual).to.deep.equal(expected);
    });
});
