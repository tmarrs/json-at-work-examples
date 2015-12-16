"use strict";

var chai = require('chai');

var parser = require('../../lib/parser');

var expect = chai.expect;

var _n = parser._n;
var _p = parser._p;
var _ps = parser._ps;
var _sp = parser._sp;

describe('parser normalize general', function () {
    it('$.store.book[*].author', function () {
        var actual = parser.normalize('$.store.book[*].author');
        var expected = [
            _n('root'),
            _p('store'),
            _p('book'),
            _n('wildcard'),
            _p('author')
        ];
        expect(actual).to.deep.equal(expected);
    });

    it('$..author', function () {
        var actual = parser.normalize('$..author');
        var expected = [
            _n('root'),
            _n('recursive_descent'),
            _p('author')
        ];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store.*', function () {
        var actual = parser.normalize('$.store.*');
        var expected = [_n('root'), _p('store'), _n('wildcard')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price', function () {
        var actual = parser.normalize('$.store..price');
        var expected = [_n('root'), _p('store'), _n('recursive_descent'), _p('price')];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[2]', function () {
        var actual = parser.normalize('$..book[2]');
        var expected = [
            _n('root'),
            _n('recursive_descent'),
            _p('book'), {
                type: 'property',
                parameter: 2
            }
        ];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[(@.length-1)]', function () {
        var actual = parser.normalize('$..book[(@.length-1)]');
        var expected = [_n('root'), _n('recursive_descent'), _p('book'), {
            type: 'script',
            parameter: '@.length-1'
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[-1:]', function () {
        var actual = parser.normalize('$..book[-1:]');
        var expected = [_n('root'), _n('recursive_descent'), _p('book'), _ps([{
            start: -1,
            end: null,
            step: 1
        }])];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[1,2]', function () {
        var actual = parser.normalize('$..book[1,2]');
        var expected = [_n('root'), _n('recursive_descent'), _p('book'), {
            type: 'properties',
            parameter: [1, 2]
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[:2]', function () {
        var actual = parser.normalize('$..book[:2]');
        var expected = [_n('root'), _n('recursive_descent'), _p('book'), {
            type: 'properties',
            parameter: [{
                start: 0,
                end: 2,
                step: 1
            }]
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[*][category,author]', function () {
        var actual = parser.normalize('$..book[*][category,author]');
        var expected = [_n('root'), _n('recursive_descent'), _p('book'), _n('wildcard'), {
            type: 'properties',
            parameter: ['category', 'author']
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[*][\'category\',"author"]', function () {
        var actual = parser.normalize('$..book[*][\'category\',"author"]');
        var expected = [_n('root'), _n('recursive_descent'), _p('book'), _n('wildcard'), {
            type: 'properties',
            parameter: ['category', 'author']
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[?(@.isbn)]', function () {
        var actual = parser.normalize('$..book[?(@.isbn)]');
        var expected = [_n('root'), _n('recursive_descent'), _p('book'), {
            type: 'filter_script',
            parameter: '@.isbn'
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$..[?(@.price>19)]^', function () {
        var actual = parser.normalize('$..[?(@.price>19)]^');
        var filterScriptNode = {
            type: 'filter_script',
            parameter: '@.price>19'
        };
        expect(actual).to.deep.equal([_n('root'), _n('recursive_descent'), filterScriptNode, _n('parent')]);
    });

    it('$..*', function () {
        var actual = parser.normalize('$..*');
        expect(actual).to.deep.equal([_n('root'), _n('recursive_descent'), _n('wildcard')]);
    });

    it('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]', function () {
        var actual = parser.normalize('$.store.book[?(@path !== "$[\'store\'][\'book\'][0]")]');
        var expected = [_n('root'), _p('store'), _p('book'), {
            type: 'filter_script',
            parameter: '@path !== "$[\'store\'][\'book\'][0]"'
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$.store..price.round()', function () {
        var actual = parser.normalize('$.store..price.round()');
        var expected = [_n('root'), _p('store'), _n('recursive_descent'), _p('price'), {
            type: 'fn',
            parameter: 'round'
        }];
        expect(actual).to.deep.equal(expected);
    });

    it('$.link[$.obj.library.books[0].references[*]].title', function () {
        var actual = parser.normalize('$.link[$.obj.library.books[0].references[*]].title');
        var expected = [_n('root'), _p('link'), {
            type: 'subpath',
            parameter: '$.obj.library.books[0].references[*]'
        }, _p('title')];
        expect(actual).to.deep.equal(expected);
    });

    it('$..book[*].category^', function () {
        var actual = parser.normalize('$..book[*].category^');
        var expected = [
            _n('root'),
            _n('recursive_descent'),
            _p('book'),
            _n('wildcard'),
            _p('category'),
            _n('parent')
        ];
        expect(actual).to.deep.equal(expected);
    });
});

describe('parser normalize $', function () {
    it('$', function () {
        var actual = parser.normalize('$');
        var expected = [_p('$')];
        expect(actual).to.deep.equal(expected);
    });

    it('$$', function () {
        var actual = parser.normalize('$$');
        var expected = [_p('$$')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.prop', function () {
        var actual = parser.normalize('$.prop');
        var expected = [_n('root'), _p('prop')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.$prop[$]', function () {
        var actual = parser.normalize('$.$prop[$]');
        var expected = [_n('root'), _p('$prop'), _p('$')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.$prop[$.$key]', function () {
        var actual = parser.normalize('$.$prop[$.$key]');
        var expected = [_n('root'), _p('$prop'), _sp('$.$key')];
        expect(actual).to.deep.equal(expected);
    });
});

describe('parser normalize *', function () {
    it('*', function () {
        var actual = parser.normalize('*');
        var expected = [_n('wildcard')];
        expect(actual).to.deep.equal(expected);
    });

    it('**', function () {
        var actual = parser.normalize('**');
        var expected = [_n('wildcard'), _n('wildcard')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.prop*.*', function () {
        var actual = parser.normalize('$.prop*.*.$*');
        var expected = [_n('root'), _p('prop*'), _n('wildcard'), _p('$*')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.prop[*]', function () {
        var actual = parser.normalize('$.prop[*]');
        var expected = [_n('root'), _p('prop'), _n('wildcard')];
        expect(actual).to.deep.equal(expected);
    });
});

describe('parser normalize *', function () {
    it('*', function () {
        var actual = parser.normalize('*');
        var expected = [_n('wildcard')];
        expect(actual).to.deep.equal(expected);
    });

    it('**', function () {
        var actual = parser.normalize('**');
        var expected = [_n('wildcard'), _n('wildcard')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.prop*.*', function () {
        var actual = parser.normalize('$.prop*.*.$*');
        var expected = [_n('root'), _p('prop*'), _n('wildcard'), _p('$*')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.prop[*]', function () {
        var actual = parser.normalize('$.prop[*]');
        var expected = [_n('root'), _p('prop'), _n('wildcard')];
        expect(actual).to.deep.equal(expected);
    });
});

describe('parser normalize ^', function () {
    it('prop^', function () {
        var actual = parser.normalize('prop^');
        var expected = [_p('prop'), _n('parent')];
        expect(actual).to.deep.equal(expected);
    });

    it('prop.^.other', function () {
        var actual = parser.normalize('prop.^.other');
        var expected = [_p('prop'), _n('parent'), _p('other')];
        expect(actual).to.deep.equal(expected);
    });

    it('prop.^.other^', function () {
        var actual = parser.normalize('prop.^.other^');
        var expected = [_p('prop'), _n('parent'), _p('other'), _n('parent')];
        expect(actual).to.deep.equal(expected);
    });

    it('prop^[b]^', function () {
        var actual = parser.normalize('prop^[b]^');
        var expected = [_p('prop'), _n('parent'), _p('b'), _n('parent')];
        expect(actual).to.deep.equal(expected);
    });
});

describe('parser normalize nested', function () {
    it('$.prop["]nested"]', function () {
        var actual = parser.normalize('$.prop["]nested"]');
        var expected = [_n('root'), _p('prop'), _p(']nested')];
        expect(actual).to.deep.equal(expected);
    });

    it('$.prop[\'nes]ted\']', function () {
        var actual = parser.normalize('$.prop[\'nes]ted\']');
        var expected = [_n('root'), _p('prop'), _p('nes]ted')];
        expect(actual).to.deep.equal(expected);
    });

});
