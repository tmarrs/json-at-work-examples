"use strict";

var chai = require('chai');

var json2json = require('../index');

var case_0 = require('./test_cases/case-arrayContent-0');
var case_1 = require('./test_cases/case-arrayContent-1');

var expect = chai.expect;

describe('arrayContent', function () {
    var engine = json2json.instance();

    it('case-arrayContent-0: basic', function () {
        var template = case_0.template;
        var n = case_0.inputs.length;
        for (var i = 0; i < n; ++i) {
            var actual = engine.run(template, case_0.inputs[i]);
            expect(actual).to.deep.equal(case_0.expecteds[i]);
        }
    });

    it('case-arrayContent-1: null', function () {
        var template = case_1.template;
        var n = case_1.inputs.length;
        for (var i = 0; i < n; ++i) {
            var actual = engine.run(template, case_1.inputs[i]);
            expect(actual).to.equal(case_1.expecteds[i]);
        }
    });
});
