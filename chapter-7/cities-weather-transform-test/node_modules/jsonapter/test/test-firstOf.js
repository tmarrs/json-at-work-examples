"use strict";

var chai = require('chai');

var json2json = require('../index');

var case_0 = require('./test_cases/case-firstOf-0');

var expect = chai.expect;

describe('firtOf', function () {
    var engine = json2json.instance();

    it('case-firstOf-0: basic', function () {
        var template = case_0.template;
        var n = case_0.inputs.length;
        for (var i = 0; i < n; ++i) {
            var actual = engine.run(template, case_0.inputs[i]);
            expect(actual).to.deep.equal(case_0.expecteds[i]);
        }
    });
});
