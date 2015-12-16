"use strict";

var chai = require('chai');

var json2json = require('../index');

var case_0 = require('./test_cases/case-override-0');

var expect = chai.expect;

describe('content', function () {
    var override = {
        people: [],
        external: function (template, input) {
            var templateValue = template.external;
            var external = this.run(templateValue, input);
            if (external !== null) {
                this.people.push(external);
                return this.people.length - 1;
            } else {
                return null;
            }
        }
    };

    var engine = json2json.instance(override, ['external']);

    it('case-coverride-0: basic', function () {
        var actual = engine.run(case_0.template, case_0.input);
        expect(actual).to.deep.equal(case_0.expected);
        expect(override.people).to.have.length(2);
        expect(override.people).to.deep.equal([{
            lastName: 'DOE',
            firstName: 'JOE'
        }, {
            lastName: 'DOE',
            firstName: 'JANE'
        }]);
    });
});
