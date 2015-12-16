"use strict";

var chai = require('chai');

var jsonPath = require('../../index').expression;

var expect = chai.expect;

var json = {
    "name": "root",
    "children": [{
        "name": "child1",
        "children": [{
            "name": "child1_1"
        }, {
            "name": "child1_2"
        }]
    }, {
        "name": "child2",
        "children": [{
            "name": "child2_1"
        }]
    }, {
        "name": "child3",
        "children": [{
            "name": "child3_1"
        }, {
            "name": "child3_2"
        }]
    }]
};

describe('parent selector', function () {

    it('simple parent selection', function () {
        var result = jsonPath({
            json: json,
            path: '$.children[0]^',
            flatten: true
        });
        expect(result).to.deep.equal(json.children);
    });

    it('parent selection with multiple matches', function () {
        var expected = [json.children, json.children];
        var result = jsonPath({
            json: json,
            path: '$.children[1:3]^'
        });
        expect(result).to.deep.equal(expected);
    });

    it('select sibling via parent', function () {
        var expected = [{
            "name": "child3_2"
        }];
        var result = jsonPath({
            json: json,
            path: '$..[?(@.name && @.name.match(/3_1$/))]^[?(@.name.match(/_2$/))]'
        });
        expect(result).to.deep.equal(expected);
    });

    it('parent parent parent', function () {
        var expected = json.children[0].children;
        var result = jsonPath({
            json: json,
            path: '$..[?(@.name && @.name.match(/1_1$/))].name^^',
            flatten: true
        });
        expect(result).to.deep.equal(expected);
    });

    it('no such parent', function () {
        var result = jsonPath({
            json: json,
            path: 'name^^'
        });
        expect(result).to.deep.equal([]);
    });

});
