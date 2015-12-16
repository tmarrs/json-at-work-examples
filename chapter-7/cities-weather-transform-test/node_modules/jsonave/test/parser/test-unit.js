"use strict";

var chai = require('chai');

var parser = require('../../lib/parser.js');

var expect = chai.expect;
var re = parser.re;
var subscriptToNode = parser.subscriptToNode;

describe('reqular expression verification', function () {
    var expectSingleMatch = function (expression, result, count) {
        count = count || 1;
        expect(result).not.to.equal(null);
        expect(result.length).to.equal(count);
        expect(result[0]).to.equal(expression);
    };

    describe('identifier', function () {
        var expressions = [
            '$',
            '$aA',
            '$29Ab',
            'a2etA',
            'buyet',
            'A',
            'C2345'
        ];

        expressions.forEach(function (expression) {
            it(expression, function () {
                var result = re.identifier.exec(expression);
                expectSingleMatch(expression, result);
            });

            var withComma = expression + ',';
            it(withComma, function () {
                var result = re.identifier.exec(withComma);
                expectSingleMatch(expression, result);
            });

            var withCommaRepeat = expression + ',' + expression;
            it(withCommaRepeat, function () {
                var result = re.identifier.exec(withCommaRepeat);
                expectSingleMatch(expression, result);
            });
        });
    });

    describe('integer', function () {
        var expressions = [
            '-1',
            '0',
            '20',
            '9'
        ];

        expressions.forEach(function (expression) {
            it(expression, function () {
                var result = re.integer.exec(expression);
                expectSingleMatch(expression, result);
            });

            var withComma = expression + ',';
            it(withComma, function () {
                var result = re.integer.exec(withComma);
                expectSingleMatch(expression, result);
            });

            var withCommaRepeat = expression + ',' + expression;
            it(withCommaRepeat, function () {
                var result = re.integer.exec(withCommaRepeat);
                expectSingleMatch(expression, result);
            });
        });
    });

    describe('range', function () {
        var expressions = [
            '1:10',
            '0:-4',
            '2:5',
            '9:11',
            '1:1:10',
            '0:2:-4',
            '2:2:5',
            '11:-2:0',
            '0::2',
            ':2',
            ':5:1',
            '::2',
            '::'
        ];

        var expectRangeComponents = function (expression, result) {
            expectSingleMatch(expression, result, 4);
            var actuals = expression.split(':').map(function (piece) {
                if (piece === '') {
                    return undefined;
                } else {
                    return piece;
                }
            });
            expect(result[1]).to.equal(actuals[0]);
            expect(result[2]).to.equal(actuals[1]);
            expect(result[3]).to.equal(actuals[2]);
        };

        expressions.forEach(function (expression) {
            it(expression, function () {
                var result = re.range.exec(expression);
                expectRangeComponents(expression, result);
            });

            var withComma = expression + ',';
            it(withComma, function () {
                var result = re.range.exec(withComma);
                expectRangeComponents(expression, result);
            });

            var withCommaRepeat = expression + ',' + expression;
            it(withCommaRepeat, function () {
                var result = re.range.exec(withCommaRepeat);
                expectRangeComponents(expression, result);
            });
        });
    });

    describe('quoted string', function () {
        var expressions = [
            '\'a&b\\\'"x\'',
            '\'abse22\''
        ];

        expressions.forEach(function (expression) {
            it(expression, function () {
                var result = re.q_string.exec(expression);
                expectSingleMatch(expression, result);
            });

            var withComma = expression + ',';
            it(withComma, function () {
                var result = re.q_string.exec(withComma);
                expectSingleMatch(expression, result);
            });

            var withCommaRepeat = expression + ',' + expression;
            it(withCommaRepeat, function () {
                var result = re.q_string.exec(withCommaRepeat);
                expectSingleMatch(expression, result);
            });
        });
    });

    describe('double quoted string', function () {
        var expressions = [
            '"a\'&b\\"x"',
            '"abse22"'
        ];

        expressions.forEach(function (expression) {
            it(expression, function () {
                var result = re.qq_string.exec(expression);
                expectSingleMatch(expression, result);
            });

            var withComma = expression + ',';
            it(withComma, function () {
                var result = re.qq_string.exec(withComma);
                expectSingleMatch(expression, result);
            });

            var withCommaRepeat = expression + ',' + expression;
            it(withCommaRepeat, function () {
                var result = re.qq_string.exec(withCommaRepeat);
                expectSingleMatch(expression, result);
            });
        });
    });
});

describe('subscriptToNode', function () {
    var subscripts = [{
        value: '1:8:2',
        expected: {
            type: 'properties',
            parameter: [{
                start: 1,
                end: 8,
                step: 2
            }]
        }
    }];

    subscripts.forEach(function (subscript) {
        it(subscript.value, function () {
            var actual = subscriptToNode(subscript.value);
            expect(actual).to.deep.equal(subscript.expected);
        });
    });
});
