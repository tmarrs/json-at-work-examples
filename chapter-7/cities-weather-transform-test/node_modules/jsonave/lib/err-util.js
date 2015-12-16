'use strict';

var util = require('util');

var codes = exports.codes = {
    'parser.path.incomplete': 'Incomplete path.',
    'parser.path....': 'Invalid syntax "...".',
    'parser.subscript.unmatched\'': 'Unmatched quote.',
    'parser.subscript.unmatched"': 'Unmatched double quote.',
    'parser.subscript.unmatched]': 'Closing square brackets is not found.',
    'parser.subscript.invalidchar': 'Invalid character "%s" in subscript %s.',
    'parser.subscript.unmatched?': 'Subscript start with "?" but the second character is not "("',
    'parser.subscript.unmatched?(': 'Subscript starts with "?(" but does not end with ")".',
    'parser.subscript.unmatched(': 'Subscript starts with "(" but does not end with ")".',
    'parser.subscript.empty': 'Empty subscript in path.',
    'parser.subscript.invalidsub': 'Invalid subscript: %s',
    test0: 'test message',
    test1: 'test message param %s',
    test2: 'test message param %s param %s',
    unknown: 'Unknown error.'
};

exports.throwErr = function (code) {
    var text = codes[code];
    var msg;
    if (text && arguments.length > 1) {
        arguments[0] = text;
        msg = util.format.apply(null, arguments);
    } else {
        msg = text || codes.unknown;
    }
    var err = new Error(msg);
    err.code = code;
    throw err;
};
