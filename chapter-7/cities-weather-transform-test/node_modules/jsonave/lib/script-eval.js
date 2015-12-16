/*jslint evil: true */

'use strict';

var util = require('util');

exports.evaluate = function (code, context) {
    var declarations = Object.keys(context).reduce(function (r, varName) {
        var value = context[varName];
        var declaration = util.format('var %s = %s;', varName, JSON.stringify(value));
        r += declaration;
        return r;
    }, "");
    var codeWithDeclaration = declarations + code;
    var result = eval(codeWithDeclaration);
    return result;
};
