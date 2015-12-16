"use strict";

var chai = require('chai');

var json2json = require('../index');

var case_0 = require('./test_cases/case-assign-0');
var case_1 = require('./test_cases/case-assign-1');

var expect = chai.expect;

describe('assign', function () {
    var engine = json2json.instance();

    it('case-assign-0: basic', function () {
        var actual = engine.run(case_0.template, case_0.input);
        expect(actual).to.deep.equal(case_0.expected);
    });

    it('case-assign-1: null returning', function () {
        var actual = engine.run(case_1.template, case_1.input);
        expect(actual).to.equal(case_1.expected);
    });
});
